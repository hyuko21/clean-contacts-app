import setupMiddlewares from '@/main/config/middlewares'
import express from 'express'

type AppMock = {
  app: express.Express
  router: express.Router
}

export const mockApp = (): AppMock => {
  const app = express()
  setupMiddlewares(app)
  const router = express.Router()
  app.use(router)
  return { app, router }
}
