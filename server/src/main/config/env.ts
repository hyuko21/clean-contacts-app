import dotenv from 'dotenv-flow'
import { resolve } from 'path'
import { path as rootPath } from 'app-root-path'

dotenv.config()

export default {
  STORAGE_BASE_PATH: resolve(rootPath, process.env.STORAGE_NAME ?? 'storage'),
  PORT: Number(process.env.PORT ?? 4202)
}
