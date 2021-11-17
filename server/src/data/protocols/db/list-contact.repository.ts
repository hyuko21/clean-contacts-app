import { ContactModel } from '@/domain/models'

export interface IListContactRepository {
  list: () => Promise<IListContactRepository.Result>
}

export namespace IListContactRepository {
  export type Result = ContactModel[]
}
