import { ReactNode } from 'react'
import { SubmitHandler } from 'react-hook-form'

import classes from './Form.module.scss'

interface Props {
  children: ReactNode
  buttonText?: string
  onSubmit: SubmitHandler<any>
  isValid: boolean
  title: string
}

const Form = ({ children, onSubmit, title, isValid = true, buttonText = undefined }: Props) => {
  return (
    <form className={classes.form} onSubmit={onSubmit}>
      <h3 className={classes.form__title}>{title}</h3>
      {children}
      {buttonText && (
        <button type="submit" className={classes.form__submit} disabled={!isValid}>
          {buttonText}
        </button>
      )}
    </form>
  )
}

export default Form
