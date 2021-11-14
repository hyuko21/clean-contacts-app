import faker from 'faker'
import { AddContactUseCaseSpy } from '@/domain/mocks/mock-usecases'
import { AddContactController } from './add-contact.controller'

type SutTypes = {
  sut: AddContactController
  addContactUseCase: AddContactUseCaseSpy
}

const makeSut = (): SutTypes => {
  const addContactUseCase = new AddContactUseCaseSpy()
  const sut = new AddContactController(addContactUseCase)
  return { sut, addContactUseCase }
}

const mockRequest = (): AddContactController.Request => ({
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

describe('AddContact Controller', () => {
  describe('AddContact UseCase dependency', () => {
    it('should return `success` with execute() returned result', async () => {
      const { sut, addContactUseCase } = makeSut()
      addContactUseCase.result = false

      const request = mockRequest()
      const response = await sut.handle(request)

      expect(response).toEqual({ statusCode: 200, body: { success: addContactUseCase.result } })
    })
  })
})
