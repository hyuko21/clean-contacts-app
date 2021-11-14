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
  let sutTypes: SutTypes

  beforeEach(() => {
    sutTypes = makeSut()
  })

  describe('AddContact UseCase dependency', () => {
    it('should call execute() with correct params', async () => {
      const { sut, addContactUseCase } = sutTypes
      const request = mockRequest()

      await sut.handle(request)

      expect(addContactUseCase.params).toEqual(request)
    })

    it('should return `success` with execute() returned result', async () => {
      const { sut, addContactUseCase } = sutTypes
      addContactUseCase.result = false

      const response = await sut.handle(mockRequest())

      expect(response).toEqual({ statusCode: 200, body: { success: addContactUseCase.result } })
    })
  })
})
