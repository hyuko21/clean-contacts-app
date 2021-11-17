import {
  AddContactController,
  ListContactController
} from '@/presentation/controllers'
import {
  makeDbAddContactUseCase,
  makeDbListContactUseCase
} from '@/main/factories/usecases/contacts-usecases.factory'
import { IController } from '@/presentation/protocols'

export const makeAddContactController = (): IController => {
  return new AddContactController(makeDbAddContactUseCase())
}

export const makeListContactController = (): IController => {
  return new ListContactController(makeDbListContactUseCase())
}
