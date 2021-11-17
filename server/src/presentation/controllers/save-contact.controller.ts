import {
  ILoadByIdContactUseCase,
  ISaveContactUseCase
} from '@/domain/usecases'
import { HttpResponse, IController } from '@/presentation/protocols'
import { makeAppResponse, ok } from '@/presentation/helpers'

export class SaveContactController implements IController {
  constructor (
    private readonly saveContactUseCase: ISaveContactUseCase,
    private readonly loadByIdUseCase: ILoadByIdContactUseCase
  ) {}

  async handle (request: SaveContactController.Request): Promise<HttpResponse> {
    let contact = await this.loadByIdUseCase.execute({ id: request.contactId })
    if (!contact) {
      return ok(makeAppResponse({ error: 'Contact not found' }))
    }
    contact = await this.saveContactUseCase.execute({
      name: request.name,
      email: request.email,
      phone: request.phone,
      address: request.address
    })
    const response = makeAppResponse({ result: contact })
    return ok(response)
  }
}

export namespace SaveContactController {
  export type Request = {
    contactId: string
    name?: string
    email?: string
    phone?: string
    address: {
      houseNumber?: number
      streetName?: string
      city?: string
      state?: string
    }
  }
}
