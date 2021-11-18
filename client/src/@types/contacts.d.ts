type Contact = {
  id: string
  name: string
  email: string
  phone: string
  address: ContactAddress
}

type ContactAddress = {
  houseNumber: number
  country: string
  city: string
  state: string
  streetName: string
}

type EditContact = Omit<Contact & ContactAddress, 'address'>