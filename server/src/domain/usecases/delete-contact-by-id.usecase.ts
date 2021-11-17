export interface IDeleteContactByIdUseCase {
  execute: (params: IDeleteContactByIdUseCase.Params) => Promise<IDeleteContactByIdUseCase.Result>
}

export namespace IDeleteContactByIdUseCase {
  export type Params = {
    id: string
  }
  export type Result = boolean
}
