import pino from 'pino'

const transport = pino.transport({
  targets: [
    {
      target: 'pino/file',
      options: { destination: `app.log` }
    },
    {
      target: 'pino-pretty',

    },
  ],
})

const logger = pino(transport)

export default logger