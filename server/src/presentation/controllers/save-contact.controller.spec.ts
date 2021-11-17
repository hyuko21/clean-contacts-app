import { LoadByIdContactUseCaseSpy, SaveContactUseCaseSpy } from '@/domain/mocks/mock-usecases'
import { SaveContactController } from './save-contact.controller'
import { ok } from '@/presentation/helpers'
import { mockSaveContactRequest } from '@/presentation/mocks/mock-controllers'

type SutTypes = {
  sut: SaveContactController
  saveContactUseCase: SaveContactUseCaseSpy
  loadByIdContactUseCase: LoadByIdContactUseCaseSpy
}

const makeSut = (): SutTypes => {
  const saveContactUseCase = new SaveContactUseCaseSpy()
  const loadByIdContactUseCase = new LoadByIdContactUseCaseSpy()
  const sut = new SaveContactController(saveContactUseCase, loadByIdContactUseCase)
  return { sut, saveContactUseCase, loadByIdContactUseCase }
}

describe('SaveContact Controller', () => {
  let sutTypes: SutTypes

  beforeEach(() => {
    sutTypes = makeSut()
  })

  describe('LoadByIdContact UseCase dependency', () => {
    it('should call execute() with correct params', async () => {
      const { sut, loadByIdContactUseCase } = sutTypes
      const request = mockSaveContactRequest()

      await sut.handle(request)

      expect(loadByIdContactUseCase.params).toEqual({ id: request.contactId })
    })

    it('should return `success` as false with error if execute() returns falsy', async () => {
      const { sut, loadByIdContactUseCase } = sutTypes
      loadByIdContactUseCase.result = null

      const result = await sut.handle(mockSaveContactRequest())

      expect(result).toEqual(ok({ success: false, error: 'Contact not found' }))
    })
  })

  describe('SaveContact UseCase dependency', () => {
    it('should call execute() with correct params', async () => {
      const { sut, saveContactUseCase } = sutTypes
      const request = mockSaveContactRequest()

      await sut.handle(request)

      expect(saveContactUseCase.params).toEqual({
        name: request.name,
        email: request.email,
        phone: request.phone,
        address: request.address
      })
    })
  })

  it('should return `success` and `result` with correct data', async () => {
    const { sut, saveContactUseCase } = sutTypes

    const response = await sut.handle(mockSaveContactRequest())

    expect(response).toEqual(
      ok({
        success: true,
        result: saveContactUseCase.result
      })
    )
  })
})
