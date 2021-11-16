import { stateProvinceMappingList } from '../data/state-province-mapping-list'

type StateProvinceInputProps =
  React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> &
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> &
  { countrycode?: string }

export const StateProvinceInput = (props: StateProvinceInputProps) => {
  const countryCode = props.countrycode as string
  const stateProvinceListByCountry = stateProvinceMappingList[countryCode]
  if (stateProvinceListByCountry) {
    return (
      <select {...props}>
        <option selected>{'<Select an option>'}</option>
        {stateProvinceListByCountry.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}
      </select>
    )
  }
  return <input {...props} />
}