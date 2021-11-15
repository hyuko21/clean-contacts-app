import { Express } from 'express'
import { bodyParser, loggerHandler, errorHandler } from '@/main/middlewares'

export const setupMiddlewares = (app: Express): void => {
  app.use(bodyParser)
  app.use(loggerHandler)
}

export const setupHandlers = (app: Express): void => {
  app.use(errorHandler)
}
