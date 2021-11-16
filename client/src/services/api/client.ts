import { AxiosResponse } from 'axios'
import { api } from './config'

export class Client {
  private static instance: Client
  private static resource: string
  private readonly _baseUrl: string
  private _data: any;

  private constructor(resource: string) {
    Client.resource = resource
    this._baseUrl = resource
    this._data = {}
  }

  static getInstance(resource: string): Client {
    if (!Client.instance || resource !== Client.resource) {
      Client.instance = new Client(resource)
    }
    return Client.instance
  }

  get baseUrl() {
    return this._baseUrl;
  }

  data(data: any) {
    this._data = data;
    return this;
  }

  post() {
    return api.post(this.baseUrl, this._data);
  }
}

export type ApiResponse<T = { success: boolean, error?: string }> = AxiosResponse<T>;
