import { useState } from 'react'
import { toast } from 'react-toastify'
import { isEqual } from '../utils/object'
import { ContactsService, EditContactPayload } from '../services/api/contacts'

export type EditContactActionType = 'add' | 'save'

export const useContact = () => {
  const [startContactState, setStartContactState] = useState<EditContact | null>(null)
  const [editingContact, setEditingContact] = useState<EditContact | null>(null)
  const [deletingContact, setDeletingContact] = useState<Contact | null>(null)
  const [editingContactActionType, setEditingContactActionType] = useState<EditContactActionType>()
  const [isLoading, setIsLoading] = useState(false)

  const startEditingContact = (
    _editingContact: EditContact | null,
    _editingContactActionType?: EditContactActionType
  ) => {
    setStartContactState(_editingContact)
    updateEditingContact(_editingContact, _editingContactActionType)
  }

  const updateEditingContact = (
    _editingContact: EditContact | null,
    _editingContactActionType?: EditContactActionType
  ) => {
    setEditingContact(_editingContact)
    setEditingContactActionType(_editingContactActionType)
  }

  const editingContactHasChanges = () => {
    return !isEqual(startContactState, editingContact)
  }

  const editContact = async (): Promise<boolean> => {
    if (!editingContact || !editingContactHasChanges()) {
      setEditingContact(null)
      return false
    }

    setIsLoading(true)
    try {
      const service = (() => {
        switch (editingContactActionType) {
          case 'save': return (data: EditContactPayload) => {
            return ContactsService.saveContact(editingContact.id, data)
          }
          case 'add':
          default: return (data: EditContactPayload) => ContactsService.addContact(data)
        }
      })()
      const { data } = await service({
        name: editingContact.name,
        email: editingContact.email,
        phone: editingContact.phone,
        address: {
          country: editingContact.country,
          houseNumber: editingContact.houseNumber,
          streetName: editingContact.streetName,
          city: editingContact.city,
          state: editingContact.state
        }
      })

      if (data.success) {
        setEditingContact(null)
        toast.success('Contact info saved')
        return true
      } else {
        toast.error(data.error)
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again later')
    } finally {
      setIsLoading(false)
    }
    return false
  }

  const deleteContact = async (): Promise<boolean> => {
    if (!deletingContact) {
      return false
    }

    setIsLoading(true)
    try {
      const { data } = await ContactsService.deleteContact(deletingContact.id)
      if (data.success) {
        setDeletingContact(null)
        toast.success('Contact deleted')
        return true
      } else {
        toast.error(data.error)
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again later')
    } finally {
      setIsLoading(false)
    }
    return false
  }

  const listContact = () => ContactsService.listContact()

  return {
    editingContact,
    editingContactActionType,
    startEditingContact,
    updateEditingContact,
    deletingContact,
    setDeletingContact,
    isLoading,

    editContact,
    listContact,
    deleteContact
  }
}