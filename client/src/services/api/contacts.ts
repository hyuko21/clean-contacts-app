import { Client, ApiResponse } from './client'

const resourceName = 'contacts'

export type EditContactPayload = {
  name: string
  email: string
  phone: string
  address: {
    country: string
    houseNumber: number
    streetName: string
    city: string
    state: string
  }
};

function addContact(
  payload: EditContactPayload
): Promise<ApiResponse> {
  return Client.getInstance(resourceName).data(payload).doRequest('post');
}

function listContact(): Promise<ApiResponse<Contact[]>> {
  return Client.getInstance(resourceName).doRequest('get')
}

function saveContact(
  contactId: string,
  payload: EditContactPayload
): Promise<ApiResponse> {
  return Client.getInstance(resourceName).id(contactId).data(payload).doRequest('patch');
}

function deleteContact(contactId: string): Promise<ApiResponse> {
  return Client.getInstance(resourceName).id(contactId).doRequest('delete');
}

export const ContactsService = {
  addContact,
  listContact,
  saveContact,
  deleteContact
};
