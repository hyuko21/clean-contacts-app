import { Modal } from '../../components/Modal';

type ViewContactDialogProps = {
  contact: Contact;
  onClose: () => void
};

export function ViewContactDialog({ contact, onClose }: ViewContactDialogProps) {
  const formatAddress = (
    { streetName, city, state, houseNumber }: ContactAddress
  ) => `${streetName}, ${houseNumber} - ${city}, ${state}`

  return (
    <Modal
      title='Contact details'
      open={true}
      onClose={onClose}
    >
      <div className='mt-10 sm:mt-10'>
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Name</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{contact.name}</dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">E-mail address</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{contact.email}</dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Phone</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{contact.phone}</dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Address</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {formatAddress(contact.address)}
            </dd>
          </div>
        </dl>
        <div className='px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
          <button
            type='button'
            className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
            onClick={onClose}
          >
            Dimiss
          </button>
        </div>
      </div>
    </Modal>
  );
}
