import { Express } from 'express'
import {
  bodyParser,
  cors,
  loggerHandler,
  errorHandler,
  contentType
} from '@/main/middlewares'

export const setupMiddlewares = (app: Express): void => {
  app.use(bodyParser)
  app.use(cors)
  app.use(contentType)
  app.use(loggerHandler)
}

export const setupHandlers = (app: Express): void => {
  app.use(errorHandler)
}
