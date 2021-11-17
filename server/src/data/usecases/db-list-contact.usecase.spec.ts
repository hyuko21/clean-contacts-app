import { ListContactRepositorySpy } from '@/data/mocks/mock-db-repositories'
import { DbListContactUseCase } from './db-list-contact.usecase'

type SutTypes = {
  sut: DbListContactUseCase
  listContactRepository: ListContactRepositorySpy
}

const makeSut = (): SutTypes => {
  const listContactRepository = new ListContactRepositorySpy()
  const sut = new DbListContactUseCase(listContactRepository)
  return { sut, listContactRepository }
}

describe('DbListContact UseCase', () => {
  let sutTypes: SutTypes

  beforeEach(() => {
    sutTypes = makeSut()
  })

  describe('ListContact Repository dependency', () => {
    it('should call list() once', async () => {
      const { sut, listContactRepository } = sutTypes
      const listSpy = jest.spyOn(listContactRepository, 'list')

      await sut.execute()

      expect(listSpy).toHaveBeenCalledTimes(1)
    })
  })

  it('should return same as list() returns', async () => {
    const { sut, listContactRepository } = sutTypes
    const result = await sut.execute()
    expect(result).toBe(listContactRepository.result)
  })
})
