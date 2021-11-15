import cuid from 'cuid'
import { AbstractModel } from '@/common/models'
import { FileSystemHelper } from './helper'
import { IAbstractRepository } from '@/common/db/protocols'

export abstract class FileSystemAbstractRepository<T extends AbstractModel> implements IAbstractRepository<T> {
  readonly repository: IAbstractRepository.Repository<T>

  constructor (private readonly config: FileSystemAbstractRepository.Config) {
    this.repository = makeFileSystemAbstractRepository(this.config)
  }

  async connect (): Promise<boolean> {
    return FileSystemHelper.getInstance().open(this.config.filename)
  }
}

const makeFileSystemAbstractRepository = <T extends AbstractModel> (config: FileSystemAbstractRepository.Config): IAbstractRepository.Repository<T> => {
  return {
    async find (): Promise<T[]> {
      try {
        const stringified = await FileSystemHelper.getInstance().loadContents(config.filename)
        const data = JSON.parse(stringified)
        return data
      } catch (error) {
        return []
      }
    },
    async findById (id: string): Promise<T | undefined> {
      const storedData = await this.find()
      const item = storedData.find((item) => item.id === id)
      return item
    },
    async add (item: Omit<T, 'id'>): Promise<T> {
      const newItem = { ...item, id: cuid() } as T
      const storedData = await this.find()
      const newData = [...storedData, newItem]
      await this.replace(newData)
      return newItem
    },
    async replace (data: T[]): Promise<boolean> {
      const content = JSON.stringify(data)
      return FileSystemHelper.getInstance().addContents(config.filename, content)
    },
    async delete (): Promise<boolean> {
      return this.replace([] as T[])
    }
  }
}

export namespace FileSystemAbstractRepository {
  export type Config = {
    filename: string
  }
}
