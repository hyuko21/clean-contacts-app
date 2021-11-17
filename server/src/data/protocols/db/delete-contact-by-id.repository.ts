export interface IDeleteContactByIdRepository {
  deleteById: (params: IDeleteContactByIdRepository.Params) => Promise<IDeleteContactByIdRepository.Result>
}

export namespace IDeleteContactByIdRepository {
  export type Params = {
    id: string
  }

  export type Result = boolean
}
