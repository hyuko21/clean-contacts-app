import dotenv from 'dotenv-flow'
import { path as rootPath } from 'app-root-path'

dotenv.config()

export default {
  STORAGE_BASE_PATH: `${rootPath}/${process.env.STORAGE_NAME ?? 'storage'}`
}
