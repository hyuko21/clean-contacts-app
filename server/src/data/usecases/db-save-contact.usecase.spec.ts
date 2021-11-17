import { SaveContactRepositorySpy } from '@/data/mocks/mock-db-repositories'
import { DbSaveContactUseCase } from './db-save-contact.usecase'
import { mockSaveContactUseCaseParams } from '@/domain/mocks/mock-usecases'

type SutTypes = {
  sut: DbSaveContactUseCase
  saveContactRepository: SaveContactRepositorySpy
}

const makeSut = (): SutTypes => {
  const saveContactRepository = new SaveContactRepositorySpy()
  const sut = new DbSaveContactUseCase(saveContactRepository)
  return { sut, saveContactRepository }
}

describe('DbSaveContact UseCase', () => {
  let sutTypes: SutTypes

  beforeEach(() => {
    sutTypes = makeSut()
  })
  describe('SaveContact Repository dependency', () => {
    it('should call save() with correct params', async () => {
      const { sut, saveContactRepository } = sutTypes
      const params = mockSaveContactUseCaseParams()

      await sut.execute(params)

      expect(saveContactRepository.params).toEqual(params)
    })
  })

  it('should return result with correct data on success', async () => {
    const { sut, saveContactRepository } = sutTypes
    const result = await sut.execute(mockSaveContactUseCaseParams())
    expect(result).toBe(saveContactRepository.result)
  })
})
