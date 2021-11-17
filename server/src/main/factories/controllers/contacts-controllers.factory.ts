import {
  AddContactController,
  DeleteContactByIdController,
  ListContactController,
  SaveContactController
} from '@/presentation/controllers'
import {
  makeDbAddContactUseCase,
  makeDbDeleteContactByIdUseCase,
  makeDbListContactUseCase,
  makeDbSaveContactUseCase
} from '@/main/factories/usecases/contacts-usecases.factory'
import { IController } from '@/presentation/protocols'

export const makeAddContactController = (): IController => {
  return new AddContactController(makeDbAddContactUseCase())
}

export const makeListContactController = (): IController => {
  return new ListContactController(makeDbListContactUseCase())
}

export const makeSaveContactController = (): IController => {
  return new SaveContactController(makeDbSaveContactUseCase())
}

export const makeDeleteContactController = (): IController => {
  return new DeleteContactByIdController(makeDbDeleteContactByIdUseCase())
}
