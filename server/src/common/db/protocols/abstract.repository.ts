import { AbstractModel } from '@/common/models'

export interface IAbstractRepository<T extends AbstractModel> {
  connect: () => Promise<boolean>
  repository: IAbstractRepository.Repository<T>
}

export namespace IAbstractRepository {
  export type Repository<T> = {
    find: () => Promise<T[]>
    findById: (id: string) => Promise<T | undefined>
    updateById: (id: string, data: any) => Promise<T | undefined>
    add: (item: Omit<T, 'id'>) => Promise<T>
    replace: (data: T[]) => Promise<T[]>
    delete: () => Promise<boolean>
    deleteById: (id: string) => Promise<boolean>
  }
}
