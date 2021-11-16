import { Express } from 'express'
import {
  bodyParser,
  cors,
  loggerHandler,
  errorHandler,
  contentType
} from '@/main/middlewares'

const middlewares = [
  bodyParser,
  cors,
  contentType,
  loggerHandler
]

const handlers = [
  errorHandler
]

export const setupMiddlewares = (app: Express, useMiddlewares = middlewares): void => {
  useMiddlewares.forEach(middleware => app.use(middleware))
}

export const setupHandlers = (app: Express, useHandlers = handlers): void => {
  useHandlers.forEach(handler => app.use(handler))
}
