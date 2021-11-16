import { countryList } from '../data/country-list'

export const CountrySelect = (props: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>) => (
  <select {...props}>
    <option selected>{'<Select an option>'}</option>
    {countryList.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}
  </select>
)