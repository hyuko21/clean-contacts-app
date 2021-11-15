import { createLogger, format, transports } from 'winston'

const logFormat = format.combine(
  format.json(),
  format.colorize({ all: true, colors: { warn: 'yellow', error: 'red' } }),
  format.timestamp(),
  format.errors({ stack: true })
)

const loggerOptions = {
  level: 'info',
  format: logFormat,
  defaultMeta: { service: 'contacts-app-server' },
  handleExceptions: true,
  json: false,
  colorize: true,
  transports: [
    new transports.Console({
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.align()
      ),
      level: 'debug'
    })
  ]
}

export const Logger = createLogger(loggerOptions)
