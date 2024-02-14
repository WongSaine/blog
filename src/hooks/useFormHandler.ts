import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import React, { useEffect } from 'react'

import { commonSlice } from '../store/common/commonSlice.ts'
import { IError } from '../models/IError.ts'

import { useAppDispatch } from './useAppDispatch.ts'
import { useAppSelector } from './useAppSelector.ts'

export function useFormHandler<T extends FieldValues>(
  // @ts-ignore
  callback: (data: IFormInput, event: React.BaseSyntheticEvent | undefined) => Promise<void>,
  values: T | undefined = undefined
) {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors, isValid },
    control,
  } = useForm<T>({
    mode: 'onBlur',
    values,
  })

  const dispatch = useAppDispatch()
  const { errors } = useAppSelector((state) => state.commonReducer)

  const prFormErr = Object.keys(formErrors).map(
    (key) =>
      ({
        key,
        message: formErrors[key]?.message,
      } as IError)
  )

  useEffect(() => {
    dispatch(
      commonSlice.actions.setErrors({
        status: 0,
        errors: prFormErr,
      })
    )
  }, [JSON.stringify(prFormErr)])

  const formHandler: SubmitHandler<T> = async (data, event) => {
    await callback(data, event)
  }
  return {
    register,
    formHandler: handleSubmit(formHandler),
    isValid,
    errors,
    control,
  }
}
