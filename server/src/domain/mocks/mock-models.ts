import faker from 'faker'
import { ContactModel } from '@/domain/models'
import { mockAbstractModel } from '@/common/models/mocks/mock-abstract.model'

export const mockContactModel = (): ContactModel => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  phone: faker.phone.phoneNumber(),
  address: {
    houseNumber: faker.datatype.number(),
    streetName: faker.address.streetName(),
    city: faker.address.cityName(),
    state: faker.address.stateAbbr()
  },
  ...mockAbstractModel()
})
