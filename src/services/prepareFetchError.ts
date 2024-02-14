import { IError } from '../models/IError.ts'

export const prepareFetchError = (error: IError) => {
  let errors = {
    errors: [{ key: 'fetch', message: error.message }],
    status: error.response?.status,
  }
  if (typeof error.response?.data?.errors === 'object') {
    errors = {
      ...errors,
      errors: [
        ...errors.errors,
        ...Object.keys(error.response.data.errors).map((key) => ({
          key: key,
          message: error.response?.data.errors[key] as string,
        })),
      ],
    }
  }

  return errors
}
