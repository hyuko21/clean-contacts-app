import faker from 'faker'
import { CheckContactByIdMiddleware } from '@/presentation/middlewares'

export const mockCheckContactByIdRequest = (): CheckContactByIdMiddleware.Request => ({
  contactId: faker.datatype.uuid()
})
