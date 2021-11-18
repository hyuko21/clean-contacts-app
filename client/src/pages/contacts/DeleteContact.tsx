import { Modal } from '../../components/Modal';
import { Loading } from '../../components/Loading';

type DeleteContactDialogProps = {
  deletingContact: Contact | null
  setDeletingContact: (deletingContact: Contact | null) => void
  isLoading: boolean
  handleDeleteContact: () => Promise<void>
};

export function DeleteContactDialog({
  deletingContact,
  setDeletingContact,
  isLoading,
  handleDeleteContact,
}: DeleteContactDialogProps) {
  const onClose = () => setDeletingContact(null)

  return (
    <Modal
      title='Deleting Contact'
      open={true}
      onClose={onClose}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <div className='mt-10 sm:mt-0'>
          <div className='md:grid md:gap-6'>
            <div className='mt-5 md:mt-0 md:col-span-2'>
              <div className='sm:flex sm:items-start'>
                <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                  <div className='mt-2'>
                    <p className='text-sm text-gray-500'>
                      Deleting contact{' '}
                      <span className='font-bold'>{deletingContact?.name} ({deletingContact?.email} - {deletingContact?.phone})</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className='px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
                <button
                  type='button'
                  className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm'
                  onClick={() => handleDeleteContact()}
                >
                  Delete
                </button>
                <button
                  type='button'
                  className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
