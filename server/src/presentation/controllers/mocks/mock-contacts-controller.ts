import faker from 'faker'
import { AddContactController } from '@/presentation/controllers'

export const mockAddContactRequest = (): AddContactController.Request => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  phone: faker.phone.phoneNumber(),
  address: {
    houseNumber: faker.datatype.number(),
    streetName: faker.address.streetName(),
    city: faker.address.cityName(),
    state: faker.address.stateAbbr()
  }
})
