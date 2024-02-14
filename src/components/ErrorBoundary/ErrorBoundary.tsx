import { useRouteError } from 'react-router-dom'

const ErrorBoundary = () => {
  const error = useRouteError() as Error
  console.error(error)
  return <div>{error.message}</div>
}
export default ErrorBoundary
