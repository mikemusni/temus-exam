import { useCallback } from 'react'
import { profileService } from '../../services/api'

const redirectHooks = () => {
  const redirect = useCallback(async (shortened: string) => {
    return await profileService(shortened)
  }, [])

  return {
    redirect
  }
}

export default redirectHooks
