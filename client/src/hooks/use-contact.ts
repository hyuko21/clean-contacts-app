import { useState } from 'react'
import { toast } from 'react-toastify'
import { ContactsService } from '../services/api/contacts'

export const useContact = () => {
  const [contact, setContact] = useState<Contact>({} as Contact)
  const [isLoading, setIsLoading] = useState(false)

  const addContact = async () => {
    setIsLoading(true)
    try {
      const { data } = await ContactsService.addContact({
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        address: {
          houseNumber: contact.houseNumber,
          streetName: contact.streetName,
          city: contact.city,
          state: contact.state
        }
      })

      if (data.success) {
        setContact({} as Contact)
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

  return { contact, setContact, addContact, isLoading }
}