import express, { Express } from 'express'
import setupMiddlewares from './middlewares'

export function buildApp (): Express {
  const app = express()
  setupMiddlewares(app)
  return app
}
