import { useState } from 'react'
import { toast } from 'react-toastify'
import { ContactsService } from '../services/api/contacts'

export const useContact = () => {
  const [editContact, setEditContact] = useState<EditContact>({} as EditContact)
  const [isLoading, setIsLoading] = useState(false)

  const addContact = async () => {
    setIsLoading(true)
    try {
      const { data } = await ContactsService.addContact({
        name: editContact.name,
        email: editContact.email,
        phone: editContact.phone,
        address: {
          houseNumber: editContact.houseNumber,
          streetName: editContact.streetName,
          city: editContact.city,
          state: editContact.state
        }
      })

      if (data.success) {
        setEditContact({} as EditContact)
        toast.success('Contact info saved')
      } else {
        toast.error(data.error)
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again later')
    } finally {
      setIsLoading(false)
    }
  }

  const listContact = () => ContactsService.listContact()

  return {
    editContact,
    setEditContact,
    isLoading,

    addContact,
    listContact
  }
}