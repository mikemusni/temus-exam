import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import redirectHooks from './hooks'

const RedirectShortened = () => {
  const { shortEnd } = useParams()
  const navigate = useNavigate()
  const { redirect } = redirectHooks()

  useEffect(() => {
    if (shortEnd) {
      redirect(shortEnd).then((result) => {
        if (result.status === 'success') {
          window.location.href = result.data.original_url
        } else {
          navigate('/')
        }
      })
    }
  }, [shortEnd])

  return <>redirecting...</>
}

export default RedirectShortened
