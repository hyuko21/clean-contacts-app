import { DbAddContactUseCase } from '@/data/usecases'
import { IAddContactUseCase } from '@/domain/usecases'
import { FileSystemContactsRepository } from '@/infra/db/file-system'

export const makeDbAddContactUseCase = (): IAddContactUseCase => {
  const fileSystemContactsRepository = new FileSystemContactsRepository()
  return new DbAddContactUseCase(
    fileSystemContactsRepository,
    fileSystemContactsRepository
  )
}
