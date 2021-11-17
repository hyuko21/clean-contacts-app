import { LoadContactByIdUseCaseSpy } from '@/domain/mocks/mock-usecases'
import { ok } from '@/presentation/helpers'
import { mockCheckContactByIdRequest } from '@/presentation/mocks/mock-middlewares'
import { CheckContactByIdMiddleware } from './check-contact-by-id.middleware'

type SutTypes = {
  sut: CheckContactByIdMiddleware
  loadContactByIdUseCase: LoadContactByIdUseCaseSpy
}

const makeSut = (): SutTypes => {
  const loadContactByIdUseCase = new LoadContactByIdUseCaseSpy()
  const sut = new CheckContactByIdMiddleware(loadContactByIdUseCase)
  return { sut, loadContactByIdUseCase }
}

describe('CheckContactById Middleware', () => {
  let sutTypes: SutTypes

  beforeEach(() => {
    sutTypes = makeSut()
  })

  describe('LoadContactById UseCase dependency', () => {
    it('should call execute() with correct params', async () => {
      const { sut, loadContactByIdUseCase } = sutTypes
      const request = mockCheckContactByIdRequest()

      await sut.handle(request)

      expect(loadContactByIdUseCase.params).toEqual({ id: request.contactId })
    })

    it('should return `success` as false with error if execute() returns falsy', async () => {
      const { sut, loadContactByIdUseCase } = sutTypes
      loadContactByIdUseCase.result = null

      const result = await sut.handle(mockCheckContactByIdRequest())

      expect(result).toEqual(ok({ success: false, error: 'Contact not found' }))
    })
  })

  it('should return 200 with correct data on success', async () => {
    const { sut, loadContactByIdUseCase } = sutTypes
    const result = await sut.handle(mockCheckContactByIdRequest())
    expect(result).toEqual(ok({ contactId: loadContactByIdUseCase.result?.id }))
  })
})
