import { ContactModel } from '@/domain/models'

export interface ISaveContactRepository {
  save: (params: ISaveContactRepository.Params) => Promise<ISaveContactRepository.Result>
}

export namespace ISaveContactRepository {
  export type Params = {
    name?: string
    email?: string
    phone?: string
    address?: {
      houseNumber?: number
      streetName?: string
      city?: string
      state?: string
    }
  }
  export type Result = ContactModel
}
