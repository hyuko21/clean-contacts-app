import { DeleteContactByIdRepositorySpy } from '@/data/mocks/mock-db-repositories'
import { DbDeleteContactByIdUseCase } from './db-delete-contact-by-id.usecase'
import { mockDeleteContactByIdUseCaseParams } from '@/domain/mocks/mock-usecases'

type SutTypes = {
  sut: DbDeleteContactByIdUseCase
  deleteContactByIdRepository: DeleteContactByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const deleteContactByIdRepository = new DeleteContactByIdRepositorySpy()
  const sut = new DbDeleteContactByIdUseCase(deleteContactByIdRepository)
  return { sut, deleteContactByIdRepository }
}

describe('DbDeleteContactById UseCase', () => {
  let sutTypes: SutTypes

  beforeEach(() => {
    sutTypes = makeSut()
  })

  describe('DeleteContactById Repository dependency', () => {
    it('should call deleteById() with correct params', async () => {
      const { sut, deleteContactByIdRepository } = sutTypes
      const params = mockDeleteContactByIdUseCaseParams()

      await sut.execute(params)

      expect(deleteContactByIdRepository.params).toEqual(params)
    })
  })

  it('should return result with correct data on success', async () => {
    const { sut, deleteContactByIdRepository } = sutTypes
    const result = await sut.execute(mockDeleteContactByIdUseCaseParams())
    expect(result).toBe(deleteContactByIdRepository.result)
  })
})
