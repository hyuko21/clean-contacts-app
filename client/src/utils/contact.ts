export const getEditingContact = (contact: Contact): EditContact => ({
  id: contact.id,
  name: contact.name,
  email: contact.email,
  phone: contact.phone,
  city: contact.address.city,
  country: contact.address.country,
  houseNumber: contact.address.houseNumber,
  state: contact.address.state,
  streetName: contact.address.streetName
})