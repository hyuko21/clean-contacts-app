import { mockAddMany, mockAddOne } from '@/test-helpers/db'
import { FileSystemAbstractRepository } from '@/common/db/file-system'
import { FileSystemContactsRepository } from '@/infra/db/file-system/fs-contacts.repository'
import { ContactModel } from '@/domain/models'
import { mockContactModel, mockManyContactModel } from '@/domain/mocks/mock-models'

class TestFileSystemContactsRepository extends FileSystemAbstractRepository<ContactModel> {
  constructor () {
    super({ filename: FileSystemContactsRepository.filename })
  }
}

const testRepository = new TestFileSystemContactsRepository()

export const mockAddOneContact = async (
  model: Partial<ContactModel> = mockContactModel()
) => mockAddOne(testRepository, model)

export const mockAddManyContact = async (
  models: ContactModel[] = mockManyContactModel()
) => mockAddMany(testRepository, models)
