import { CheckContactByIdMiddleware } from '@/presentation/middlewares'
import { IMiddleware } from '@/presentation/protocols'
import { makeDbLoadContactByIdUseCase } from '@/main/factories/usecases/contacts-usecases.factory'

export const makeCheckContactByIdMiddleware = (): IMiddleware => {
  return new CheckContactByIdMiddleware(makeDbLoadContactByIdUseCase())
}
