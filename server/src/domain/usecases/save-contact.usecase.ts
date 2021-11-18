import { ContactModel } from '@/domain/models'

export interface ISaveContactUseCase {
  execute: (params: ISaveContactUseCase.Params) => Promise<ISaveContactUseCase.Result>
}

export namespace ISaveContactUseCase {
  export type Params = {
    contactId: string
    name?: string
    email?: string
    phone?: string
    address?: {
      country?: string
      houseNumber?: number
      streetName?: string
      city?: string
      state?: string
    }
  }
  export type Result = ContactModel | null
}
