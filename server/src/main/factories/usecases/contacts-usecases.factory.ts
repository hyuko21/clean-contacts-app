import {
  DbAddContactUseCase,
  DbListContactUseCase,
  DbLoadContactByIdUseCase,
  DbSaveContactUseCase
} from '@/data/usecases'
import {
  IAddContactUseCase,
  IListContactUseCase,
  ILoadContactByIdUseCase,
  ISaveContactUseCase
} from '@/domain/usecases'
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

export const makeDbSaveContactUseCase = (): ISaveContactUseCase => {
  const fileSystemContactsRepository = new FileSystemContactsRepository()
  return new DbSaveContactUseCase(fileSystemContactsRepository)
}

export const makeDbLoadContactByIdUseCase = (): ILoadContactByIdUseCase => {
  const fileSystemContactsRepository = new FileSystemContactsRepository()
  return new DbLoadContactByIdUseCase(fileSystemContactsRepository)
}
