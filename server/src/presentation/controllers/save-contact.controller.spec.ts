import { LoadContactByIdUseCase, SaveContactUseCaseSpy } from '@/domain/mocks/mock-usecases'
import { SaveContactController } from './save-contact.controller'
import { ok } from '@/presentation/helpers'
import { mockSaveContactRequest } from '@/presentation/mocks/mock-controllers'

type SutTypes = {
  sut: SaveContactController
  saveContactUseCase: SaveContactUseCaseSpy
  loadContactByIdUseCase: LoadContactByIdUseCase
}

const makeSut = (): SutTypes => {
  const saveContactUseCase = new SaveContactUseCaseSpy()
  const loadContactByIdUseCase = new LoadContactByIdUseCase()
  const sut = new SaveContactController(saveContactUseCase, loadContactByIdUseCase)
  return { sut, saveContactUseCase, loadContactByIdUseCase }
}

describe('SaveContact Controller', () => {
  let sutTypes: SutTypes

  beforeEach(() => {
    sutTypes = makeSut()
  })

  describe('LoadContactById UseCase dependency', () => {
    it('should call execute() with correct params', async () => {
      const { sut, loadContactByIdUseCase } = sutTypes
      const request = mockSaveContactRequest()

      await sut.handle(request)

      expect(loadContactByIdUseCase.params).toEqual({ id: request.contactId })
    })

    it('should return `success` as false with error if execute() returns falsy', async () => {
      const { sut, loadContactByIdUseCase } = sutTypes
      loadContactByIdUseCase.result = null

      const result = await sut.handle(mockSaveContactRequest())

      expect(result).toEqual(ok({ success: false, error: 'Contact not found' }))
    })
  })

  describe('SaveContact UseCase dependency', () => {
    it('should call execute() with correct params', async () => {
      const { sut, saveContactUseCase } = sutTypes
      const request = mockSaveContactRequest()

      await sut.handle(request)

      expect(saveContactUseCase.params).toEqual(request)
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
