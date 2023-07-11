import bot from './telegram.js';
import config from './config.js';
import db from './db.js';
import logger from './logger.js';

async function readFeedbacks(msg){
  // check if the user is an admin
  // its from a callback so the id is in msg.chat.id
	if (!config.admins.includes(msg.chat.id.toString())) {
		return
	}
  logger.info('User %s is reading feedbacks', msg.chat.username);

  await db.read();
  const keys = Object.keys(db.data.feedbacks);
  let message = `<b>Feedbacks</b>\n\n`;
  keys.forEach(key => {
    const feedback = db.data.feedbacks[key];
    if(feedback.user && feedback.feedback){
      message += `<b>Edición:</b> ${feedback.edition}\n<b>Usuario:</b> ${feedback.user.first_name} (<code>@${feedback.user.username}</code>)\n<b>Feedback:</b> ${feedback.feedback}\n\n`
    }
  })
  message += `<b>-- Fin de los feedbacks --</b>`

  let options = {
    parse_mode: 'HTML',
    // reply_markup: {
    //   inline_keyboard: [
    //     [{ text: 'Siguiente ➡️', callback_data: 'edition01_page_1' }],
    //   ]
    // }
  };

  await bot.sendMessage(msg.chat.id, message, options);

  return
}

export default {
  readFeedbacks,
}