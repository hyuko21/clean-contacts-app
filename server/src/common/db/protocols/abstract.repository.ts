import { AbstractModel } from '@/common/models'

export interface IAbstractRepository<T extends AbstractModel> {
  connect: () => Promise<boolean>
  find: () => Promise<T[]>
  findById: (id: string) => Promise<T | undefined>
  add: (item: T) => Promise<T>
  replace: (data: T[]) => Promise<boolean>
  delete: () => Promise<boolean>
}
