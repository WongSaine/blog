import { useNavigate } from 'react-router-dom'
import React from 'react'

import Form from '../Form'
import { useAppDispatch, useAppSelector, useFormHandler } from '../../hooks'
import InputField from '../InputField'
import { updateUser } from '../../store/users/usersActions.ts'

import classes from './ProfilePage.module.scss'

interface IFormInput {
  username: string
  email: string
  password?: string
  image: string
}

const ProfilePage = () => {
  const user = useAppSelector((state) => state.userReducer.user)

  const navigate = useNavigate()
  if (!user) {
    navigate('/sign-in')
  }

  const dispatch = useAppDispatch()
  const formCallback = async (data: IFormInput, event: React.BaseSyntheticEvent | undefined) => {
    event?.preventDefault()
    dispatch(updateUser(data))
  }
  const { isValid, register, formHandler, errors } = useFormHandler<IFormInput>(formCallback, {
    username: user?.username ?? '',
    email: user?.email ?? '',
    image: user?.image ?? '',
  })

  return (
    <div className={classes.profilePage}>
      <Form onSubmit={formHandler} isValid={isValid} buttonText={'Save'} title="Edit Profile">
        <InputField
          autofocus
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
          label={'New password'}
          placeholder={'Password'}
          type="password"
          rules={{
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
          name="image"
          register={register}
          errors={errors.errors?.filter((err) => err.key === 'image')}
          label={'Avatar image (url)'}
          placeholder={'Avatar image'}
          rules={{
            pattern: {
              value: /^((ftp|http|https):\/\/)?(www\.)?([\w\-.]+)\.([A-z]{2,})(\/[\w\-/.&?=:]+)$/,
              message: 'Required valid url',
            },
          }}
        />
      </Form>
    </div>
  )
}

export default ProfilePage
