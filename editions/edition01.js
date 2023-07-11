import bot from '../telegram.js';
import config from '../config.js';
import db from '../db.js';

async function sendStart(msg){
  let message = `
*Brifeame: Guatemala 🇬🇹*
_con Briseida Milián Lemus \\(Twitter: [@BriseidaMilian](https://twitter.com/BriseidaMilian)\\)_

En nuestra \\#1 edición, Briseida nos va brifear que está pasando, cómo llegamos hasta aquí, cómo profundizar sobre el tema\\.\\.\\.
`
let options = {
  parse_mode: 'MarkdownV2',
  reply_markup: {
    inline_keyboard: [
      [{ text: 'Siguiente ➡️', callback_data: 'edition01_page_1' }],
    ]
  }
};

  await bot.sendMessage(msg.chat.id, message, options);

  return
}

async function sendIndex(msg) {
  let message = `
*Brifeame\\.LA*
\\#1 Edición: *Brifeame: Guatemala 🇬🇹*

_¿A que página te gustaria ir? 📰_

*Pág\\. 1\\)* _¿Qué está pasando en Guatemala?_
*Pág\\. 2\\)* _¿Quiénes son los partidos y fuerzas tradicionales en Guatemala que ven como amenaza a una nueva fuerza?_
*Pág\\. 3\\)* _¿Qué momentos de la historia reciente explican lo que pasa hoy?_
*Pág\\. 4\\)* _¿Qué tiene que ver el estallido de 2015 con lo que pasa hoy?_
*Pág\\. 5\\)* _¿Cómo llegó Movimiento Semilla a ser la nueva fuerza política en Guatemala?_
*Pág\\. 6\\)* _¿Dónde seguir este tema?_ 🤔
`
    let options = {
      parse_mode: 'MarkdownV2',
      reply_markup: {
        inline_keyboard: [
          [{ text: '📲 Pag. 1', callback_data: 'edition01_page_1' }, {text: '📲 Pag. 2', callback_data: 'edition01_page_2'}],
          [{ text: '📲 Pag. 3', callback_data: 'edition01_page_3' }, {text: '📲 Pag. 4', callback_data: 'edition01_page_4'}],
          [{ text: '📲 Pag. 5', callback_data: 'edition01_page_5' }, {text: '📲 Pag. 6', callback_data: 'edition01_page_6'}],
          [{text: 'Dejar feedback', callback_data: 'edition01_feedback'}],
        ]
      }
    };
  
  await bot.sendMessage(msg.chat.id, message, options);
  return
}

async function sendPage1(msg) {
  let message = `
*Brifeame: Guatemala 🇬🇹*
*1/6\\)* _¿Qué está pasando?_
`

  await bot.sendMessage(msg.chat.id, message, { parse_mode: 'MarkdownV2' });

  // send picture assets/edition01/page01.jpg
  await bot.sendPhoto(
    msg.chat.id,
    config.getFilePath('edition01/page01.jpg'),
    // { caption: '📰 Pag. 1 ¿Qué está pasando en Guatemala?'}
  )

  // send audio assets/edition01/page01.ogg
  await bot.sendAudio(
    msg.chat.id, config.getFilePath('edition01/page01.ogg'),
    { 
      caption: '🔊 Dale play!',
      performer: 'Briseida Milián Lemus',
      title: '¿Qué está pasando?'
    },
    {
      filename: 'Brifeame.LA - #1 - Briseida Milián Lemus - Pag. 1',
      contentType: 'application/octet-stream'
    }
  )

  let endMessage = `_Fín de la página 1 de 6_

Como seguimos? 🤔
`
  let options = {
    parse_mode: 'MarkdownV2',
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Siguiente ➡️', callback_data: 'edition01_page_2' }],
        // [{ text: 'Stop', callback_data: 'edition01_index' }],
      ]
    }
  }
  await bot.sendMessage(msg.chat.id, endMessage, options);
  return
}

async function sendPage2(msg) {
  let message = `
*Brifeame: Guatemala 🇬🇹*
*2/6\\)* _¿Quiénes son los partidos y fuerzas tradicionales que ven como amenaza a una nueva fuerza?_
`

  await bot.sendMessage(msg.chat.id, message, { parse_mode: 'MarkdownV2' });

  await bot.sendPhoto(
    msg.chat.id,
    config.getFilePath('edition01/page02.jpg'),
  )

  await bot.sendAudio(
    msg.chat.id,
    config.getFilePath('edition01/page02.ogg'),
    { 
      caption: '🔊 Dale play!',
      performer: 'Briseida Milián Lemus',
      title: '¿Quiénes son los partidos y fuerzas tradicionales que ven como amenaza a una nueva fuerza?'
    },
    {
      filename: 'Brifeame.LA - #1 - Briseida Milián Lemus - Pag. 2',
      contentType: 'application/octet-stream'
    }
  )

  let endMessage = `_Fín de la página 2 de 6_

Como seguimos? 🤔
`
  let options = {
    parse_mode: 'MarkdownV2',
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Siguiente ➡️', callback_data: 'edition01_page_3' }],
      ]
    }
  }
  await bot.sendMessage(msg.chat.id, endMessage, options);
  return
}

async function sendPage3(msg) {
  let message = `
*Brifeame: Guatemala 🇬🇹*
*3/6\\)* _¿Qué momentos de la historia reciente explican lo que pasa hoy?_
`

  await bot.sendMessage(msg.chat.id, message, { parse_mode: 'MarkdownV2' });

  await bot.sendPhoto(
    msg.chat.id,
    config.getFilePath('edition01/page03.jpg'),
  )

  await bot.sendAudio(
    msg.chat.id,
    config.getFilePath('edition01/page03.ogg'),
    { 
      caption: '🔊 Dale play!',
      performer: 'Briseida Milián Lemus',
      title: '¿Qué momentos de la historia reciente explican lo que pasa hoy?'
    },
    {
      filename: 'Brifeame.LA - #1 - Briseida Milián Lemus - Pag. 3',
      contentType: 'application/octet-stream'
    }
  )

  let endMessage = `_Fín de la página 3 de 6_

Como seguimos? 🤔
`
  let options = {
    parse_mode: 'MarkdownV2',
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Siguiente ➡️', callback_data: 'edition01_page_4' }],
      ]
    }
  }
  await bot.sendMessage(msg.chat.id, endMessage, options);
  return
}

async function sendPage4(msg) {
  let message = `
*Brifeame: Guatemala 🇬🇹*
*4/6\\)* _¿Qué tiene que ver el estallido de 2015 con lo que pasa hoy?_
`

  await bot.sendMessage(msg.chat.id, message, { parse_mode: 'MarkdownV2' });

  await bot.sendPhoto(
    msg.chat.id,
    config.getFilePath('edition01/page04.jpg'),
  )

  await bot.sendAudio(
    msg.chat.id,
    config.getFilePath('edition01/page04.ogg'),
    { 
      caption: '🔊 Dale play!',
      performer: 'Briseida Milián Lemus',
      title: '¿Qué tiene que ver el estallido de 2015 con lo que pasa hoy?'
    },
    {
      filename: 'Brifeame.LA - #1 - Briseida Milián Lemus - Pag. 4',
      contentType: 'application/octet-stream'
    }
  )

  let endMessage = `_Fín de la página 4 de 6_

Como seguimos? 🤔
`
  let options = {
    parse_mode: 'MarkdownV2',
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Siguiente ➡️', callback_data: 'edition01_page_5' }],
      ]
    }
  }
  await bot.sendMessage(msg.chat.id, endMessage, options);
  return
}

async function sendPage5(msg) {
  let message = `
*Brifeame: Guatemala 🇬🇹*
*5/6\\)* _¿Cómo llegó Movimiento Semilla a ser la nueva fuerza política?_
`

  await bot.sendMessage(msg.chat.id, message, { parse_mode: 'MarkdownV2' });

  await bot.sendPhoto(
    msg.chat.id,
    config.getFilePath('edition01/page05.jpg'),
  )

  await bot.sendAudio(
    msg.chat.id,
    config.getFilePath('edition01/page05.ogg'),
    { 
      caption: '🔊 Dale play!',
      performer: 'Briseida Milián Lemus',
      title: '¿Cómo llegó Movimiento Semilla a ser la nueva fuerza política?'
    },
    {
      filename: 'Brifeame.LA - #1 - Briseida Milián Lemus - Pag. 5',
      contentType: 'application/octet-stream'
    }
  )

  let endMessage = `_Fín de la página 5 de 6_

Como seguimos? 🤔
`
  let options = {
    parse_mode: 'MarkdownV2',
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Siguiente ➡️', callback_data: 'edition01_page_6' }],
      ]
    }
  }
  await bot.sendMessage(msg.chat.id, endMessage, options);
  return
}

async function sendPage6(msg) {
  let message = `
<b>Brifeame: Guatemala 🇬🇹</b>
<b>6/6)</b> ¿Dónde seguir este tema?

Podes leer mas sobre el tema en los siguientes medios:

🔗 <a href="https://twitter.com/msemillagt">Movimiento Semilla</a>
🔗 <a href="https://www.plazapublica.com.gt/">Plaza Pública</a>
🔗 <a href="https://quorum.gt/">Quorum</a>
🔗 <a href="https://www.no-ficcion.com/">No-Ficción</a>
🔗 <a href="https://www.rudagt.org/">RUDA</a>

<b>+Guatemala en la RINP</b>

<b>Briseida Milián Lemus</b>
🔗 <a href="https://twitter.com/BriseidaMilian">https://twitter.com/BriseidaMilian</a>
Activista guatemalteca, doctoranda en ciencia política. Parte de JusticiaYa 2015-2019, socia fundadora del Instituto 25A desde 2018.

<b>Ixel Guorón</b>
🔗 <a href="https://twitter.com/IxelGuoron">https://twitter.com/IxelGuoron</a>
Activista Maya-Kaqchikel, integrante de Tik Na'oj <a href="https://www.tiknaoj.org/">https://www.tiknaoj.org/</a> y del Instituto 25A. <a href="https://i25a.gt/">https://i25a.gt/</a>

<b>Julio Herrera</b>
🔗 <a href="https://twitter.com/jherreratoledo">https://twitter.com/jherreratoledo</a>
Co-fundador de Red Ciudadana Guatemala que trabaja en incentivar la participación ciudadana y la transparencia a través de procesos innovadores <a href="https://redciudadana.org/">https://redciudadana.org/</a>

🔥 <b>Random pero no tanto</b>
¿Por qué la bandera de Guatemala se parece a otras de Centroamérica y a la de Argentina?
🔗 <a href="https://twitter.com/ViejosEstadios/status/1155976420369166340">https://twitter.com/ViejosEstadios/status/1155976420369166340</a>
`

  await bot.sendMessage(msg.chat.id, message, { parse_mode: 'HTML' });

 

  let endMessage = `
*➡️ ¿Te gusto nuestrá primera edicion?*
Podes dejarnos un feedback apretando el botón "*💬 Mandar feedback*"\\! 

De lo contrario, podes hacer clic en "Finalizar"\\.

Gracias por leer hasta el final\\! 🙌🏽
`
  let options = {
    parse_mode: 'MarkdownV2',
    reply_markup: {
      inline_keyboard: [
        [{ text: '💬 Mandar feedback', callback_data: 'edition01_feedback' }],
        [{ text: 'Finalizar', callback_data: 'end' }],
      ]
    }
  }
  await bot.sendMessage(msg.chat.id, endMessage, options);

  return
}

async function sendFeedback(msg) {
  let message = `
*✉️ Feedback de la edición 1*

*Respondé* __a este mensaje__ con tu feedback\\! 🙌
Guardaré tu respuesta para mejorar en las próximas ediciones\\! 😁
`

  const feedbackMessage = await bot.sendMessage(msg.chat.id, message, { parse_mode: 'MarkdownV2' });

  db.data.feedbacks[`${feedbackMessage.message_id}_${msg.chat.id}`] = {
    edition: 1
  }
  await db.write()
  
  return
}




export default {
  sendStart,
  sendIndex,
  sendPage1,
  sendPage2,
  sendPage3,
  sendPage4,
  sendPage5,
  sendPage6,
  sendFeedback
}