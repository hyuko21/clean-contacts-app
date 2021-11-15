import { setupMiddlewares, setupHandlers } from '@/main/config/middlewares'
import express from 'express'

type AppMockOpts = {
  withValidation: boolean
}

type AppMock = {
  app: express.Express
  router: express.Router
}

export const mockApp = (opts: AppMockOpts = { withValidation: true }): AppMock => {
  const app = express()
  setupMiddlewares(app)
  const router = express.Router()
  app.use(router)
  if (opts.withValidation) {
    setupHandlers(app)
  }
  return { app, router }
}
