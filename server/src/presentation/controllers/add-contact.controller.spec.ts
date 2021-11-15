import { AddContactUseCaseSpy } from '@/domain/mocks/mock-usecases'
import { AddContactController } from './add-contact.controller'
import { ok } from '@/presentation/helpers'
import { mockAddContactRequest } from './mocks/mock-contacts-controller'

type SutTypes = {
  sut: AddContactController
  addContactUseCase: AddContactUseCaseSpy
}

const makeSut = (): SutTypes => {
  const addContactUseCase = new AddContactUseCaseSpy()
  const sut = new AddContactController(addContactUseCase)
  return { sut, addContactUseCase }
}

describe('AddContact Controller', () => {
  let sutTypes: SutTypes

  beforeEach(() => {
    sutTypes = makeSut()
  })

  describe('AddContact UseCase dependency', () => {
    it('should call execute() with correct params', async () => {
      const { sut, addContactUseCase } = sutTypes
      const request = mockAddContactRequest()

      await sut.handle(request)

      expect(addContactUseCase.params).toEqual(request)
    })

    it('should return `success` with execute() returned result', async () => {
      const { sut, addContactUseCase } = sutTypes
      addContactUseCase.result = false

      const response = await sut.handle(mockAddContactRequest())

      expect(response).toEqual(
        ok({ success: addContactUseCase.result, error: 'Contact is invalid' })
      )
    })
  })
})
