import { ContactModel } from '@/domain/models'

export interface ILoadContactByIdUseCase {
  execute: (params: ILoadContactByIdUseCase.Params) => Promise<ILoadContactByIdUseCase.Result>
}

export namespace ILoadContactByIdUseCase {
  export type Params = {
    id: string
  }
  export type Result = ContactModel | null
}
