import { ISaveContactUseCase } from '@/domain/usecases'
import { HttpResponse, IController } from '@/presentation/protocols'
import { makeAppResponse, ok } from '@/presentation/helpers'

export class SaveContactController implements IController {
  constructor (
    private readonly saveContactUseCase: ISaveContactUseCase
  ) {}

  async handle (request: SaveContactController.Request): Promise<HttpResponse> {
    const contact = await this.saveContactUseCase.execute(request)
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
      country?: string
      houseNumber?: number
      streetName?: string
      city?: string
      state?: string
    }
  }
}
