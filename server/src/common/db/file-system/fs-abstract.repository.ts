import cuid from 'cuid'
import { AbstractModel } from '@/common/models'
import { FileSystemHelper } from './helper'
import { IAbstractRepository } from '@/common/db/protocols'
import { updateObj } from '@/utils/object'

export abstract class FileSystemAbstractRepository<T extends AbstractModel> implements IAbstractRepository<T> {
  readonly repository: IAbstractRepository.Repository<T>

  constructor (private readonly config: FileSystemAbstractRepository.Config) {
    this.repository = FileSystemAbstractRepositoryFactory.getInstance(this.config)
  }

  async connect (): Promise<boolean> {
    return FileSystemHelper.getInstance().open(this.config.filename)
  }
}

class FileSystemAbstractRepositoryFactory<T extends AbstractModel> implements IAbstractRepository.Repository<T> {
  private static instance: FileSystemAbstractRepositoryFactory<any>
  private constructor (private readonly config: FileSystemAbstractRepository.Config) {}

  static getInstance (config: FileSystemAbstractRepository.Config): FileSystemAbstractRepositoryFactory<any> {
    if (
      !FileSystemAbstractRepositoryFactory.instance ||
      config.filename !== FileSystemAbstractRepositoryFactory.instance.config.filename
    ) {
      FileSystemAbstractRepositoryFactory.instance = new FileSystemAbstractRepositoryFactory(config)
    }
    return FileSystemAbstractRepositoryFactory.instance
  }

  async find (): Promise<T[]> {
    try {
      const stringified = await FileSystemHelper.getInstance().loadContents(this.config.filename)
      const data = JSON.parse(stringified)
      return data
    } catch (error) {
      return []
    }
  }

  async findById (id: string): Promise<T | undefined> {
    const storedData = await this.find()
    const item = storedData.find((item) => item.id === id)
    return item
  }

  async updateById (id: string, data: Omit<T, 'id'>): Promise<T | undefined> {
    const storedData = await this.find()
    let updatedItem
    const newData = storedData.map((item) => {
      if (item.id === id) {
        updatedItem = updateObj(item, data)
        return updatedItem
      }
      return item
    })
    await this.replace(newData)
    return updatedItem
  }

  async add (item: Omit<T, 'id'>): Promise<T> {
    const newItem = { ...item, id: cuid() } as T
    const storedData = await this.find()
    const newData = [...storedData, newItem]
    await this.replace(newData)
    return newItem
  }

  async replace (data: T[]): Promise<T[]> {
    const content = JSON.stringify(data)
    await FileSystemHelper.getInstance().addContents(this.config.filename, content)
    return this.find()
  }

  async delete (): Promise<boolean> {
    await this.replace([])
    return true
  }
}

export namespace FileSystemAbstractRepository {
  export type Config = {
    filename: string
  }
}
