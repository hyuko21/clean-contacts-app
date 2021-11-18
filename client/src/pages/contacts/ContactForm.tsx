import { FormEvent } from 'react'
import { CountrySelect, StateProvinceInput } from '../../helpers'
import { Loading } from '../../components'
import { useContact } from '../../hooks/use-contact'

export function ContactFormPage() {
  const { editingContact, updateEditingContact, editContact, isLoading } = useContact()

  const onChangeField = (e: React.ChangeEvent<HTMLInputElement & HTMLSelectElement>) => {
    updateEditingContact({ ...editingContact, [e.target.name]: e.target.value } as EditContact)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    await editContact()
  }

  return (
    <div className="mt-10 sm:mt-0">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Contact Information</h3>
            <p className="mt-1 text-sm text-gray-600">Use a permanent address where you can receive mail.</p>
          </div>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-2">
        {isLoading ? (
          <Loading />
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="shadow overflow-hidden sm:rounded-md">
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
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-indigo-600 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                  Submit
                </button>
              </div>
            </div>
          </form>
        )}
        </div>
      </div>
    </div>
  )
}
