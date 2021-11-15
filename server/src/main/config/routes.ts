import { Express, Router } from 'express'
import glob from 'glob'
import { resolve } from 'path'

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)
  glob.sync(resolve(__dirname, '..', 'routes', '*.routes.{ts,js}')).map(async (file: string) => {
    (await import(file)).default(router)
  })
}
