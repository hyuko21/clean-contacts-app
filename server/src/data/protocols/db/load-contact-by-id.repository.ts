import { ContactModel } from '@/domain/models'

export interface ILoadContactByIdRepository {
  loadById: (params: ILoadContactByIdRepository.Params) => Promise<ILoadContactByIdRepository.Result>
}

export namespace ILoadContactByIdRepository {
  export type Params = {
    id: string
  }

  export type Result = ContactModel | null
}
