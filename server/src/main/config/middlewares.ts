import { Express } from 'express'
import { bodyParser, errorHandler } from '@/main/middlewares'

export const setupMiddlewares = (app: Express): void => {
  app.use(bodyParser)
}

export const setupHandlers = (app: Express): void => {
  app.use(errorHandler)
}
