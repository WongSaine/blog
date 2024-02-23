import React from 'react'

import Form from '../../widgets/Form'
import InputField from '../..//widgets/InputField'
import Checkbox from '../../layouts/Checkbox'
import { createNewUser } from '../../../store/users/usersActions.ts'
import { useAppDispatch, useFormHandler } from '../../../hooks'

import classes from './Registration.module.scss'

interface IFormInput {
  username: string
  email: string
  password: string
  rePassword: string
}

const Registration = () => {
  const dispatch = useAppDispatch()

  const formCallback = async (data: IFormInput, event: React.BaseSyntheticEvent | undefined) => {
    event?.preventDefault()
    dispatch(createNewUser(data))
  }

  const { isValid, register, formHandler, errors } = useFormHandler<IFormInput>(formCallback)
  return (
    <div className={classes.registaration}>
      <Form buttonText="Create" onSubmit={formHandler} isValid={isValid} title="Create new account">
        <InputField
          name="username"
          label={'Username'}
          placeholder="Username"
          register={register}
          errors={errors.errors?.filter((err) => err.key === 'username')}
          rules={{
            required: 'Field is required',
            minLength: {
              value: 3,
              message: 'Minimal 3 chars required',
            },
            maxLength: {
              value: 20,
              message: 'Max 20 chars required',
            },
          }}
        />
        <InputField
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
            minLength: {
              value: 6,
              message: 'Minimal 6 chars required',
            },
            maxLength: {
              value: 40,
              message: 'Max 40 chars required',
            },
          }}
        />
        <InputField
          name="rePassword"
          register={register}
          errors={errors.errors?.filter((err) => err.key === 'rePassword')}
          label={'Repeat password'}
          placeholder={'Repeat password'}
          type="password"
          rules={{
            required: 'Field is required',
            validate: {
              checkPasswordEqual: (_: string, formValues: IFormInput) =>
                formValues.password === formValues.rePassword || 'Required equals to password',
            },
          }}
        />
        <hr />
        <Checkbox
          name="agree-rules"
          label="I agree to the processing of my personal information"
          register={register}
          rules={{ required: 'You need accept rules' }}
        />
      </Form>
    </div>
  )
}

export default Registration
