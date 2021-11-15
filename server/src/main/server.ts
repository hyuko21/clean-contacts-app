import 'module-alias/register'
import env from './config/env'
import { buildApp } from './config/app'
import { FileSystemHelper } from '@/common/db/file-system'

async function bootstrap (): Promise<void> {
  await FileSystemHelper.getInstance().open()
  const app = buildApp()
  app.listen(env.PORT, () => console.log(`Server running at http://localhost:${env.PORT}`))
}
bootstrap().catch(console.error)
