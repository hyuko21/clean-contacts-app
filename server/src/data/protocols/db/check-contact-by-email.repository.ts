export interface ICheckContactByEmailRepository {
  checkByEmail: (params: ICheckContactByEmailRepository.Params) => Promise<ICheckContactByEmailRepository.Result>
}

export namespace ICheckContactByEmailRepository {
  export type Params = {
    email: string
  }

  export type Result = boolean
}
