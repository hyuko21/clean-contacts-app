import { AxiosResponse } from 'axios'
import { api } from './config'

export class Client {
  private static instance: Client
  private static resource: string
  private readonly _baseUrl: string
  private _data: any;
  private _id?: string

  private constructor(resource: string) {
    Client.resource = resource
    this._baseUrl = resource
    this._data = {}
    this._id = undefined
  }

  static getInstance(resource: string): Client {
    if (!Client.instance || resource !== Client.resource) {
      Client.instance = new Client(resource)
    }
    return Client.instance
  }

  private resetState() {
    this._data = {}
    this._id = undefined
  }

  get baseUrl() {
    let url = this._baseUrl;

    if (this._id) {
      url += `/${this._id}`;
    }

    return url;
  }

  id(id: string) {
    this._id = id;
    return this;
  }

  data(data: any) {
    this._data = data;
    return this;
  }

  async doRequest(method: 'post' | 'get' | 'patch' | 'delete') {
    const response = await api[method](this.baseUrl, this._data)
    this.resetState()
    return response
  }
}

export type ApiResponse<T = undefined> = AxiosResponse<{ success: boolean, result?: T, error?: string }>;
