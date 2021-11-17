import { LoadContactByIdRepositorySpy } from '@/data/mocks/mock-db-repositories'
import { DbLoadContactByIdUseCase } from './db-load-contact-by-id.usecase'
import { mockLoadContactByIdUseCaseParams } from '@/domain/mocks/mock-usecases'

type SutTypes = {
  sut: DbLoadContactByIdUseCase
  loadContactByIdRepository: LoadContactByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadContactByIdRepository = new LoadContactByIdRepositorySpy()
  const sut = new DbLoadContactByIdUseCase(loadContactByIdRepository)
  return { sut, loadContactByIdRepository }
}

describe('DbLoadContactById UseCase', () => {
  let sutTypes: SutTypes

  beforeEach(() => {
    sutTypes = makeSut()
  })

  describe('LoadContactById Repository dependency', () => {
    it('should call loadById() with correct params', async () => {
      const { sut, loadContactByIdRepository } = sutTypes
      const params = mockLoadContactByIdUseCaseParams()

      await sut.execute(params)

      expect(loadContactByIdRepository.params).toEqual(params)
    })

    it('should return null if loadById() returns null', async () => {
      const { sut, loadContactByIdRepository } = sutTypes
      loadContactByIdRepository.result = null

      const result = await sut.execute(mockLoadContactByIdUseCaseParams())

      expect(result).toBeNull()
    })
  })

  it('should return result with correct data on success', async () => {
    const { sut, loadContactByIdRepository } = sutTypes
    const result = await sut.execute(mockLoadContactByIdUseCaseParams())
    expect(result).toBe(loadContactByIdRepository.result)
  })
})
