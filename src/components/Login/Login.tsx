import React from 'react'

import Form from '../Form'
import InputField from '../InputField'
import { useAppDispatch, useFormHandler } from '../../hooks'
import { loginUser } from '../../store/users/usersActions.ts'

import classes from './Login.module.scss'

interface IFormInput {
  email: string
  password: string
}

const Login = () => {
  const dispatch = useAppDispatch()
  const formCallback = async (data: IFormInput, event: React.BaseSyntheticEvent | undefined) => {
    event?.preventDefault()
    dispatch(loginUser(data))
  }
  const { isValid, register, formHandler, errors } = useFormHandler<IFormInput>(formCallback)

  return (
    <div className={classes.login}>
      <Form buttonText="Login" onSubmit={formHandler} isValid={isValid} title="Sign in">
        <InputField
          autofocus
          name="email"
          register={register}
          errors={errors.errors?.filter((err) => err.key === 'email')}
          rules={{
            required: 'Field is required',
            pattern: {
              value: /^[\w\-.]+@([\w-]+\.)+[\w-]{2,}$/gm,
              message: 'Required is valid email address',
            },
          }}
          label={'Email address'}
          placeholder={'Email address'}
          type="email"
        />
        <InputField
          name="password"
          register={register}
          errors={errors.errors?.filter((err) => err.key === 'password')}
          label={'Password'}
          placeholder={'Password'}
          type="password"
          rules={{
            required: 'Field is required',
          }}
        />
      </Form>
    </div>
  )
}

export default Login
