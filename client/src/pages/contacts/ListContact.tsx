import {
  XCircleIcon,
  PencilIcon,
  PlusCircleIcon,
  EyeIcon,
} from '@heroicons/react/solid';
import { useEffect, useState } from 'react';
import { Loading } from '../../components/Loading';
import { useContact } from '../../hooks/use-contact';
import { ViewContactDialog } from './ViewContact';

export function ListContactPage() {
  const { listContact } = useContact()
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoadingContacts, setIsLoadingContacts] = useState(false);
  const [viewingContact, setViewingContact] = useState<Contact | null>(null);

  useEffect(() => {
    const fetchContacts = async () => {
      setIsLoadingContacts(true);
      const { data } = await listContact();
      setContacts(data.result ?? []);
      setIsLoadingContacts(false);
    };
    fetchContacts();
  }, []);

  if (isLoadingContacts) {
    return <Loading title='Loading contacts' />
  }

  return (
    <>
      {viewingContact && (
        <ViewContactDialog
          contact={viewingContact}
          onClose={() => setViewingContact(null)}
        />
      )}
      <main>
        <div className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>
          <div className='flex justify-center items-center'>
            <button
              type='button'
              className='flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-gray-600 hover:bg-gray-500 focus:outline-none focus:border-gray-700 focus:shadow-outline-gray active:bg-gray-700'
              onClick={() => {}}
            >
              <PlusCircleIcon className='-ml-1 mr-3 h-5 w-5' />
              Add Contact
            </button>
          </div>
          {contacts.length > 0 ? (
            <div className='px-4 py-6 sm:px-0'>
              <div className='flex flex-col'>
                <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                  <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
                    <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
                      <table className='min-w-full divide-y divide-gray-200'>
                        <thead className='bg-gray-50'>
                          <tr>
                            <th
                              scope='col'
                              className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                            >
                              Name
                            </th>
                            <th
                              scope='col'
                              className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                            >
                              E-mail
                            </th>
                            <th
                              scope='col'
                              className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                            >
                              Phone
                            </th>
                            <th
                              scope='col'
                              className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                            >
                              Actions
                              <span className='sr-only'>View</span>
                              <span className='sr-only'>Edit</span>
                              <span className='sr-only'>Delete</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className='bg-white divide-y divide-gray-200'>
                          {contacts.map((contact) => (
                            <tr key={contact.id}>
                              <td className='px-6 py-4 whitespace-nowrap'>
                                <div className='flex items-center'>
                                  <div className='ml-4'>
                                    <div className='text-sm text-gray-500'>
                                      {contact.name}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className='px-6 py-4 whitespace-nowrap'>
                                <span className='px-2 inline-flex text-sm leading-5 font-semibold rounded-full text-gray-500'>
                                  {contact.email}
                                </span>
                              </td>
                              <td className='px-6 py-4 whitespace-nowrap'>
                                <span className='px-2 inline-flex text-sm leading-5 font-semibold text-gray-500'>
                                  {contact.phone}
                                </span>
                              </td>
                              <td className='py-4 whitespace-nowrap text-right text-sm font-medium'>
                                <div className='flex justify-start'>
                                  <button
                                    onClick={() => setViewingContact(contact)}
                                    className='mx-3 text-gray-600 hover:text-gray-900'
                                  >
                                    <EyeIcon className='h-6 w-6' />
                                  </button>
                                  <button
                                    onClick={() => {}}
                                    className='mx-3 text-yellow-600 hover:text-yellow-900'
                                  >
                                    <PencilIcon className='h-6 w-6' />
                                  </button>
                                  <button
                                    onClick={() => {}}
                                    className='mx-3 text-red-600 hover:text-red-900'
                                  >
                                    <XCircleIcon className='h-6 w-6' />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className='flex justify-center max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8'>
              <h1 className='text-2xl text-gray-900'>
                None contact found
              </h1>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
