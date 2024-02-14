export interface IError {
  key: string
  message: string
  response?: { data?: any; status?: number }
}

export interface IErrors {
  status: string | number
  errors?: IError[]
}
