import { AddContactController } from '@/presentation/controllers/add-contact.controller'
import { makeDbAddContactUseCase } from '@/main/factories/usecases/contacts-usecases.factory'

export const makeAddContactsController = (): AddContactController => {
  return new AddContactController(makeDbAddContactUseCase())
}
