import env from '@/main/config/env'
import { promisify } from 'util'
import { readFile, writeFile, access, mkdir } from 'fs'

export class FileSystemHelper {
  private static instance: FileSystemHelper
  private constructor () {}

  static getInstance (): FileSystemHelper {
    if (!FileSystemHelper.instance) {
      FileSystemHelper.instance = new FileSystemHelper()
    }
    return FileSystemHelper.instance
  }

  private getStoragePath (filename: string): string {
    return `${env.STORAGE_BASE_PATH}/${filename}`
  }

  async open (filename?: string): Promise<boolean> {
    const makeStorageDir = () => promisify(mkdir)(env.STORAGE_BASE_PATH, { recursive: true })

    if (!filename) {
      await makeStorageDir()
    } else {
      try {
        await promisify(access)(this.getStoragePath(filename))
      } catch (error) {
        await makeStorageDir()
        await this.addContents(filename, '')
      }
    }
    return true
  }

  async loadContents (filename: string): Promise<string> {
    return promisify(readFile)(this.getStoragePath(filename), 'utf-8')
  }

  async addContents (filename: string, content: string): Promise<boolean> {
    await promisify(writeFile)(this.getStoragePath(filename), content, 'utf-8')
    return true
  }
}
