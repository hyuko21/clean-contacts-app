import faker from 'faker'
import {
  AddContactController,
  SaveContactController
} from '@/presentation/controllers'
import { DeleteContactByIdController } from '../controllers/delete-contact-by-id.controller'

export const mockAddContactRequest = (): AddContactController.Request => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  phone: faker.phone.phoneNumber(),
  address: {
    country: faker.address.countryCode(),
    houseNumber: faker.datatype.number(),
    streetName: faker.address.streetName(),
    city: faker.address.cityName(),
    state: faker.address.stateAbbr()
  }
})

export const mockSaveContactRequest = (): SaveContactController.Request => ({
  contactId: faker.datatype.uuid(),
  name: faker.name.findName(),
  email: faker.internet.email(),
  phone: faker.phone.phoneNumber(),
  address: {
    country: faker.address.countryCode(),
    houseNumber: faker.datatype.number(),
    streetName: faker.address.streetName(),
    city: faker.address.cityName(),
    state: faker.address.stateAbbr()
  }
})

export const mockDeleteContactByIdRequest = (): DeleteContactByIdController.Request => ({
  contactId: faker.datatype.uuid()
})
