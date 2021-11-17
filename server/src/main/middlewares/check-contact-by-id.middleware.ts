import { adaptExpressMiddleware } from '@/main/adapters'
import { makeCheckContactByIdMiddleware } from '@/main/factories/middlewares/contacts-middlewares.factory'

export const checkContactById = adaptExpressMiddleware(makeCheckContactByIdMiddleware())
