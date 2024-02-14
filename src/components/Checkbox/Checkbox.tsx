import { UseFormRegister } from 'react-hook-form'

import classes from './Checkbox.module.scss'

interface Props {
  name: string
  label: string
  register: UseFormRegister<any>
  rules: object
  checked?: boolean
}

const Checkbox = ({ name, label, register, rules, checked = true }: Props) => {
  return (
    <div className={classes.checkbox}>
      <input type="checkbox" id={`${name}_id`} {...register(name, rules)} defaultChecked={checked} />
      <label htmlFor={`${name}_id`} className={classes.checkbox__label}>
        {label}
      </label>
    </div>
  )
}

export default Checkbox
