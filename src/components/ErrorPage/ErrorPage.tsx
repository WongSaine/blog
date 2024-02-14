import { useLocation } from 'react-router-dom'

const ErrorPage = () => {
  const location = useLocation()

  console.log(location)

  return <h2>404 not found</h2>
}

export default ErrorPage
