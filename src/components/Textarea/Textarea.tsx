import { UseFormRegister } from 'react-hook-form'

import { IError } from '../../models/IError.ts'

import classes from './Textarea.module.scss'

interface Props {
  name: string
  label: string
  placeholder?: string
  register: UseFormRegister<any>
  rules: object
  errors?: IError[]
  autofocus?: boolean
  children?: string
}

const Textarea = ({
  name,
  label,
  register,
  errors = undefined,
  rules,
  placeholder = undefined,
  autofocus = false,
  children = undefined,
}: Props) => {
  return (
    <>
      <div className={classes.textarea}>
        <label htmlFor={`${name}_id`} className={classes.textarea__label}>
          {label}
        </label>
        <textarea
          placeholder={placeholder}
          {...register(name, rules)}
          // @ts-ignore
          className={[classes.textarea__field, errors?.length ? classes.textarea__fieldError : ''].join(' ')}
          autoFocus={autofocus}
          id={`${name}_id`}
        >
          {children}
        </textarea>
        {Boolean(errors?.length) && <span className={classes.textarea__error}>{(errors ?? [])[0]?.message}</span>}
      </div>
    </>
  )
}

export default Textarea
