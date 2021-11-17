import { ContactModel } from '@/domain/models'

export interface IListContactUseCase {
  execute: () => Promise<IListContactUseCase.Result>
}

export namespace IListContactUseCase {
  export type Result = ContactModel[]
}
