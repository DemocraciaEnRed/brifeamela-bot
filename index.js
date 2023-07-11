/**
 * Brifeamela - A magazine served by a bot
 */

import 'dotenv/config'
import logger from './logger.js'
import bot from './telegram.js'
import config from './config.js'
import editions from './editions/index.js'
import admin from './admin.js'
import db from './db.js'

// check if the bot is running
bot.getMe().then((me) => {
  logger.debug('Hi my name is %s!', me.username)
})

bot.onText(/\/help/, async (msg) => {

	let helpMessage = `
<b>Brifeame.LA</b> 📰

Soy el bot 🤖 transmedia de la <a href="https://redinnovacionpolitica.org/">Red de Innovación Política Latinoamericana</a> 💡

Este bot no guarda ningún dato personal, ni de contacto, ni de ningún tipo. Solo se utiliza para enviar mensajes a los usuarios que lo soliciten.

Si deseas dejar de recibir mensajes, puedes hacer clic en mi nombre de usuario y luego en botón de "Detener bot".
`;

	await bot.sendMessage(msg.chat.id, helpMessage, { parse_mode: 'HTML' });
});



bot.onText(/\/start/, async (msg) => {
	// log user data
	logger.info('User data: %j', msg.from)

	
  let welcomeMessage = `
Hola ${msg.from.first_name}\\! 👋

🧡 Bienvenid@ a *Brifeame\\.LA* 📰

Soy el bot 🤖 transmedia de la *[Red de Innovación Política Latinoamericana](https://redinnovacionpolitica.org/)* 💡

⚠️ *AVISO*: Aun estamos en fase de pruebas, por lo que es posible que no funcione correctamente\\. Mil disculpas por las molestias\\. 🙏

Gracias por contactarte 🙌✨
`;

  await bot.sendMessage(msg.chat.id, welcomeMessage, { parse_mode: 'MarkdownV2' });
  // await bot.sendVideo(msg.chat.id, 'CgACAgQAAxkBAAMuZKcMJTqQxsLwjkBAMcacRzMIZIgAAwQAAjgVfFI2RcK2yN5YHy8E');
	
  let aboutMessage = `
Tenemos *un MONTOOON* de contenido para ti 🤩
	
En nuestra \\#1 edición tenemos *Brifeame: Guatemala 🇬🇹* con Briseida Milián Lemus \\(Twitter: [@BriseidaMilian](https://twitter.com/BriseidaMilian)\\)
`;
 	await bot.sendMessage(msg.chat.id, aboutMessage, { parse_mode: 'MarkdownV2' });
	// await bot.sendPhoto(msg.chat.id, 'AgACAgEAAxkBAANwZKcTNTKAdKe31XAO12woCFfzhAMAAl6yMRv4DjlF_8OdxERZW3sBAAMCAANzAAMvBA');
	await editions.mainIndex(msg);

});

bot.onText(/\/ultimaedicion/, async (msg) => {
	await editions.edition01.sendStart(msg);
});

bot.onText(/\/index/, async (msg) => {
	await editions.edition01.sendIndex(msg);
});

bot.onText(/\/admin/, async (msg) => {
	// check if the user is an admin
	if (!config.admins.includes(msg.from.id.toString())) {
		return
	}
	let message = `Que te gustaría hacer?`;
	let options = {
		parse_mode: 'HTML',
		reply_markup: {
			inline_keyboard: [
				[{ text: 'Leer Feedbacks', callback_data: 'admin_read_feedback' }],
			]
		}
	};

	await bot.sendMessage(msg.chat.id, message, options);
});

bot.onText(/\/ediciones/, async (msg) => {
	await editions.mainIndex(msg);
});


bot.on('callback_query', async (callbackQuery) => {
  const msg = callbackQuery.message;
  const data = callbackQuery.data;

	
	// remove the inline keyboard and edit in the message the selected option
	bot.editMessageReplyMarkup({ inline_keyboard: [] }, { chat_id: msg.chat.id, message_id: msg.message_id });

	logger.info('User %s selected %s', msg.chat.username, data);

	// send the selected option
	switch (data){
		case 'main_index':
			await editions.mainIndex(msg);
			return
		case 'last_edition':
			await editions.edition01.sendStart(msg);
			return
		case 'previous_editions':
			await editions.previousEditionsIndex(msg);
			return
		case 'edition01_start':
			await editions.edition01.sendStart(msg);
			return
		case 'edition01_index':
			await editions.edition01.sendIndex(msg);
			return
		case 'edition01_page_1':
		case 'edition01_page_2':
		case 'edition01_page_3':
		case 'edition01_page_4':
		case 'edition01_page_5':
		case 'edition01_page_6':
			const pageNumber = data.split('_')[2];
			await editions.edition01[`sendPage${pageNumber}`](msg);
			return
		case 'edition01_feedback':
			await editions.edition01.sendFeedback(msg);
			return
		case 'end':
			await bot.sendMessage(msg.chat.id, 'Gracias por leer Brifeame.LA 📰 👋');
			return
		case 'admin_read_feedback':
			await admin.readFeedbacks(msg);
			return
		default:
			await bot.sendMessage(msg.chat.id, 'No se ha encontrado la opción seleccionada');
			// bot.answerCallbackQuery(callbackQuery.id)
			break;
	}

	// answer the query
	bot.answerCallbackQuery(callbackQuery.id)
});


bot.on("polling_error", (err) => logger.error(err))

// listen for any kind of message
bot.on('message', async (msg) => {
	logger.info('Message data: %j', msg)
	
	// if it is a command, dont do anything
	if (msg.entities && msg.entities.some(entity => entity.type === 'bot_command')) {
		return
	}
	
	
	// if it is a reply to a message, check if it is a feedback
	if(msg.reply_to_message) {
		// discard if the message is any kind of media, only text is allowed
		if(msg.photo || msg.video || msg.audio || msg.document || msg.sticker || msg.animation || msg.voice || msg.video_note){
			await bot.sendMessage(msg.chat.id, 'Disculpa, solo se permiten mensajes de texto como feedback...\n\nSi puede, vuelva a intentarlo 🙏');
			return
		}

		await db.read();
		if(db.data.feedbacks[`${msg.reply_to_message.message_id}_${msg.from.id}`] != undefined){
			// record exists, but check if feedback is already there
			if(db.data.feedbacks[`${msg.reply_to_message.message_id}_${msg.from.id}`].feedback != undefined){
				await bot.sendMessage(msg.chat.id, 'Ya has enviado tu feedback 🙌');
				return
			}
			// record exists, feedback doesnt, so lets save it.

			let editionNumber = db.data.feedbacks[`${msg.reply_to_message.message_id}_${msg.from.id}`].edition

			let feedback = {
				'edition': editionNumber,
				'user': msg.from,
				'feedback': msg.text
			}

			db.data.feedbacks[`${msg.reply_to_message.message_id}_${msg.from.id}`] = feedback;

			await db.write();

			await bot.sendMessage(msg.chat.id, '¡Gracias por tu feedback! 😀');

			return
		}
	}

	// check if the user is an admin
	if (!config.admins.includes(msg.from.id.toString())) {
		return
	}
	// log the message data
	
	logger.info('User %s is an admin', msg.from.username)

  // if the message is a gif, log the message data
  if (msg.document && msg.document.mime_type === 'video/mp4') {
    logger.info('User %s sent a gif', msg.from.username)
    logger.info('Message data: %j', msg)
		await bot.sendMessage(msg.chat.id, 'Thank you! Check the logs for more info.');
  }

	// if the message is a photo, log the message data
	if (msg.photo) {
		logger.info('User %s sent a photo', msg.from.username)
    logger.info('Message data: %j', msg)
		await bot.sendMessage(msg.chat.id, 'Thank you! Check the logs for more info.');
	}


});