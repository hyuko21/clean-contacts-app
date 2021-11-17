import { DeleteContactByIdUseCaseSpy } from '@/domain/mocks/mock-usecases'
import { ok } from '@/presentation/helpers'
import { mockDeleteContactByIdRequest } from '@/presentation/mocks/mock-controllers'
import { DeleteContactByIdController } from './delete-contact-by-id.controller'

type SutTypes = {
  sut: DeleteContactByIdController
  deleteContactByIdUseCase: DeleteContactByIdUseCaseSpy
}

const makeSut = (): SutTypes => {
  const deleteContactByIdUseCase = new DeleteContactByIdUseCaseSpy()
  const sut = new DeleteContactByIdController(deleteContactByIdUseCase)
  return { sut, deleteContactByIdUseCase }
}

describe('DeleteContactById Controller', () => {
  let sutTypes: SutTypes

  beforeEach(() => {
    sutTypes = makeSut()
  })

  describe('DeleteContactById UseCase dependency', () => {
    it('should call execute() with correct params', async () => {
      const { sut, deleteContactByIdUseCase } = sutTypes
      const request = mockDeleteContactByIdRequest()

      await sut.handle(request)

      expect(deleteContactByIdUseCase.params).toEqual({ id: request.contactId })
    })
  })

  it('should return `success` as true on success', async () => {
    const { sut } = sutTypes
    const response = await sut.handle(mockDeleteContactByIdRequest())
    expect(response).toEqual(ok({ success: true }))
  })
})
