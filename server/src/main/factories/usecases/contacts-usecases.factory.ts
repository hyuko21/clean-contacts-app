import { DbAddContactUseCase, DbListContactUseCase } from '@/data/usecases'
import { IAddContactUseCase, IListContactUseCase } from '@/domain/usecases'
import { FileSystemContactsRepository } from '@/infra/db/file-system'

export const makeDbAddContactUseCase = (): IAddContactUseCase => {
  const fileSystemContactsRepository = new FileSystemContactsRepository()
  return new DbAddContactUseCase(
    fileSystemContactsRepository,
    fileSystemContactsRepository
  )
}

export const makeDbListContactUseCase = (): IListContactUseCase => {
  const fileSystemContactsRepository = new FileSystemContactsRepository()
  return new DbListContactUseCase(fileSystemContactsRepository)
}
