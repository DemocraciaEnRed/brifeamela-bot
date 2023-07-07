
import edition01 from './edition01.js'
import bot from '../telegram.js'


async function mainIndex(msg) {
  let options = {
    parse_mode: 'MarkdownV2',
    reply_markup: {
      inline_keyboard: [
        [{ text: '#1 Brifeame: Guatemala 🇬🇹', callback_data: 'last_edition' }],
        [{ text: '↩️ Ediciones anteriores', callback_data: 'previous_editions' }],
      ]
    }
  };

	await bot.sendMessage(msg.chat.id, `_Que te gustaria leer?_`, options);
  return
}

async function previousEditionsIndex(msg) {
  let options = {
    parse_mode: 'MarkdownV2',
    reply_markup: {
      inline_keyboard: [
        [{ text: '↩️ Volver al menú', callback_data: 'main_index' }],
      ]
    }
  }

  let message = `
*↩️ EDICIONES ANTERIORES*

Por el momento solo tenemos la \\#1 edición, pero pronto tendremos más contenido para tí 🤩
`

  await bot.sendMessage(msg.chat.id, message, options);
  return
}

const editions = {
  mainIndex,
  previousEditionsIndex,
  edition01
}

export default editions;