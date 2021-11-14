import faker from 'faker'
import { AbstractModel } from '@/common/models'

export const mockAbstractModel = (): AbstractModel => ({
  id: faker.datatype.uuid()
})
