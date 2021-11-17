import { ContactModel } from '@/domain/models'

export interface ISaveContactUseCase {
  execute: (params: ISaveContactUseCase.Params) => Promise<ISaveContactUseCase.Result>
}

export namespace ISaveContactUseCase {
  export type Params = {
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
  export type Result = ContactModel
}
