import { SaveContactUseCaseSpy } from '@/domain/mocks/mock-usecases'
import { SaveContactController } from './save-contact.controller'
import { ok } from '@/presentation/helpers'
import { mockSaveContactRequest } from '@/presentation/mocks/mock-controllers'

type SutTypes = {
  sut: SaveContactController
  saveContactUseCase: SaveContactUseCaseSpy
}

const makeSut = (): SutTypes => {
  const saveContactUseCase = new SaveContactUseCaseSpy()
  const sut = new SaveContactController(saveContactUseCase)
  return { sut, saveContactUseCase }
}

describe('SaveContact Controller', () => {
  let sutTypes: SutTypes

  beforeEach(() => {
    sutTypes = makeSut()
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
