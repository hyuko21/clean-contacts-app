import { Client, ApiResponse } from './client'

const resourceName = 'contacts'

export type AddContactPayload = {
  name: string
  email: string
  phone: string
  address: {
    houseNumber: number
    streetName: string
    city: string
    state: string
  }
};

function addContact(
  payload: AddContactPayload
): Promise<ApiResponse> {
  return Client.getInstance(resourceName).data(payload).post();
}

function listContact(): Promise<ApiResponse<Contact[]>> {
  return Client.getInstance(resourceName).get()
}

export const ContactsService = {
  addContact,
  listContact
};
