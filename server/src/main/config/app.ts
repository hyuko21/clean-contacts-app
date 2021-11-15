import express, { Express } from 'express'
import { setupMiddlewares, setupHandlers } from './middlewares'
import setupRoutes from './routes'

export function buildApp (): Express {
  const app = express()
  setupMiddlewares(app)
  setupRoutes(app)
  setupHandlers(app)
  return app
}
