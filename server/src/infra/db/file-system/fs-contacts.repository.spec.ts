import faker from 'faker'
import * as testDb from '@/test-helpers/db'
import { mockAddOneContact } from './test-helpers/fs-contacts'
import { FileSystemContactsRepository } from './fs-contacts.repository'
import { mockAddContactUseCaseParams } from '@/domain/mocks/mock-usecases'

const makeSut = (): FileSystemContactsRepository => {
  return new FileSystemContactsRepository()
}

describe('Contacts FileSystem Repository', () => {
  let sut: FileSystemContactsRepository

  beforeAll(async () => {
    sut = makeSut()
    await testDb.connect(sut)
  })

  beforeEach(async () => {
    sut = makeSut()
    await testDb.clear(sut)
  })

  afterAll(async () => {
    await testDb.clear(sut)
  })

  describe('checkByEmail()', () => {
    it('should return true if contact found by email', async () => {
      const params = mockAddContactUseCaseParams()
      await mockAddOneContact(params)

      const exists = await sut.checkByEmail({ email: params.email })

      expect(exists).toBe(true)
    })

    it('should return false if contact not found by email', async () => {
      await mockAddOneContact(mockAddContactUseCaseParams())
      const exists = await sut.checkByEmail({ email: faker.internet.email() })
      expect(exists).toBe(false)
    })
  })
})
