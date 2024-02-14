import { UseFormRegister } from 'react-hook-form'

import { IError } from '../../models/IError.ts'

import classes from './InputField.module.scss'

interface Props {
  name: string
  label?: string
  type?: string
  placeholder?: string
  register: UseFormRegister<any>
  rules: object
  errors?: IError[]
  autofocus?: boolean
  className?: string
}

const InputField = ({
  name,
  label = undefined,
  register,
  errors = undefined,
  rules,
  placeholder = undefined,
  type = 'text',
  autofocus = false,
  className = undefined,
}: Props) => {
  return (
    <>
      <div className={[classes.inputField, className].join(' ')}>
        {label && (
          <label htmlFor={`${name}_id`} className={classes.inputField__label}>
            {label}
          </label>
        )}
        <input
          type={type}
          placeholder={placeholder}
          {...register(name, rules)}
          // @ts-ignore
          className={[classes.inputField__field, errors?.length ? classes.inputField__fieldError : ''].join(' ')}
          autoFocus={autofocus}
          id={`${name}_id`}
        />
        {Boolean(errors?.length) && <span className={classes.inputField__error}>{(errors ?? [])[0]?.message}</span>}
      </div>
    </>
  )
}

export default InputField
