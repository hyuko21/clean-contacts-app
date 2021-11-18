import { Modal } from '../../components/Modal';
import { Loading } from '../../components/Loading';
import { CountrySelect, StateProvinceInput } from '../../helpers';
import { EditContactActionType } from '../../hooks/use-contact';

type EditContactDialogProps = {
  editingContact?: EditContact
  setEditingContact: (editingContact: EditContact | null, editingContactActionType?: EditContactActionType) => void
  editingContactActionType?: EditContactActionType,
  isLoading: boolean
  handleEditContact: (editingContact?: EditContact, actionType?: EditContactActionType) => Promise<void>
};

export function EditContactDialog({
  editingContact = {} as EditContact,
  setEditingContact,
  editingContactActionType,
  isLoading,
  handleEditContact,
}: EditContactDialogProps) {
  const onChangeField = (e: React.ChangeEvent<HTMLInputElement & HTMLSelectElement>) => {
    setEditingContact({ ...editingContact, [e.target.name]: e.target.value }, editingContactActionType);
  };

  const onClose = () => setEditingContact(null)

  const getTitle = () => {
    let titlePrefix = (() => {
      switch (editingContactActionType) {
        case 'save': return 'Editing'
        case 'add':
        default: return 'Adding'
      }
    })()
    return `${titlePrefix} contact`
  }

  return (
    <Modal
      title={getTitle()}
      open={true}
      onClose={onClose}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <div className='mt-10 sm:mt-0'>
          <div className='md:grid md:gap-6'>
            <div className='mt-5 md:mt-0 md:col-span-2'>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  await handleEditContact();
                }}
              >
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={editingContact?.name}
                        onChange={onChangeField}
                        id="name"
                        autoComplete="given-name"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Phone
                      </label>
                      <input
                        type="text"
                        name="phone"
                        required
                        value={editingContact?.phone}
                        onChange={onChangeField}
                        id="phone"
                        autoComplete="phone"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email address
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={editingContact?.email}
                        onChange={onChangeField}
                        id="email-address"
                        autoComplete="email"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                        Country
                      </label>
                      <CountrySelect
                        id="country"
                        name="country"
                        required
                        value={editingContact?.country}
                        onChange={onChangeField}
                        autoComplete="country-name"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                        State / Province
                      </label>
                      <StateProvinceInput
                        countrycode={editingContact?.country}
                        disabled={!editingContact?.country}
                        type="text"
                        name="state"
                        required
                        value={editingContact?.state}
                        onChange={onChangeField}
                        id="region"
                        autoComplete="address-level1"
                        className="disabled:bg-gray-300 disabled:cursor-not-allowed mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                        City
                      </label>
                      <input
                        disabled={!editingContact?.state}
                        type="text"
                        name="city"
                        required
                        value={editingContact?.city}
                        onChange={onChangeField}
                        id="city"
                        autoComplete="address-level2"
                        className="disabled:bg-gray-300 disabled:cursor-not-allowed mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="houseNumber" className="block text-sm font-medium text-gray-700">
                        House number
                      </label>
                      <input
                        type="number"
                        name="houseNumber"
                        required
                        value={editingContact?.houseNumber}
                        onChange={onChangeField}
                        id="house-number"
                        autoComplete="house-number"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6">
                      <label htmlFor="streetName" className="block text-sm font-medium text-gray-700">
                        Street address
                      </label>
                      <input
                        type="text"
                        name="streetName"
                        required
                        value={editingContact?.streetName}
                        onChange={onChangeField}
                        id="street-address"
                        autoComplete="street-address"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>
                <div className='px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
                  <button
                    type='submit'
                    className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-600 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:ml-3 sm:w-auto sm:text-sm'
                  >
                    Save
                  </button>
                  <button
                    type='button'
                    className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
