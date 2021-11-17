import { ContactModel } from '@/domain/models'

export interface ILoadByIdContactUseCase {
  execute: (params: ILoadByIdContactUseCase.Params) => Promise<ILoadByIdContactUseCase.Result>
}

export namespace ILoadByIdContactUseCase {
  export type Params = {
    id: string
  }
  export type Result = ContactModel | null
}
