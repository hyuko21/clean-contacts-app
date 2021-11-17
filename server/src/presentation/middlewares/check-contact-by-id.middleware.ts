import { ILoadContactByIdUseCase } from '@/domain/usecases'
import { HttpResponse, IMiddleware } from '@/presentation/protocols'
import { ok, makeAppResponse } from '@/presentation/helpers'

export class CheckContactByIdMiddleware implements IMiddleware {
  constructor (private readonly loadContactByIdUseCase: ILoadContactByIdUseCase) {}

  async handle (request: CheckContactByIdMiddleware.Request): Promise<HttpResponse> {
    const contact = await this.loadContactByIdUseCase.execute({ id: request.contactId })
    if (!contact) {
      return ok(makeAppResponse({ error: 'Contact not found' }))
    }
    return ok({ contactId: contact.id })
  }
}

export namespace CheckContactByIdMiddleware {
  export type Request = {
    contactId: string
  }
}
