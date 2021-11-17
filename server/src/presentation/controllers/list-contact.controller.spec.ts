import { ListContactUseCaseSpy } from '@/domain/mocks/mock-usecases'
import { ListContactController } from './list-contact.controller'
import { ok } from '@/presentation/helpers'

type SutTypes = {
  sut: ListContactController
  listContactUseCase: ListContactUseCaseSpy
}

const makeSut = (): SutTypes => {
  const listContactUseCase = new ListContactUseCaseSpy()
  const sut = new ListContactController(listContactUseCase)
  return { sut, listContactUseCase }
}

describe('ListContact Controller', () => {
  let sutTypes: SutTypes

  beforeEach(() => {
    sutTypes = makeSut()
  })

  describe('ListContact UseCase dependency', () => {
    it('should call execute() once', async () => {
      const { sut, listContactUseCase } = sutTypes
      const executeSpy = jest.spyOn(listContactUseCase, 'execute')

      await sut.handle()

      expect(executeSpy).toHaveBeenCalledTimes(1)
    })
  })

  it('should return `success` and `result` with correct data', async () => {
    const { sut, listContactUseCase } = sutTypes

    const response = await sut.handle()

    expect(response).toEqual(
      ok({
        success: true,
        result: listContactUseCase.result
      })
    )
  })
})
