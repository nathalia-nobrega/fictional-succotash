import { useEffect, useState } from 'react'
import { getUserToken } from '../lib/auth/AuthProvider'
import { LandingPage } from './LandingPage'
import { MainNavigator } from './MainNavigator'

export default function AuthSwitch() {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState<string | null>(
    null,
  )
  useEffect(() => {
    const token = async () => {
      const secToken = await getUserToken()
      if (token) setIsUserAuthenticated(secToken)
    }
    token()
  })

  if (!isUserAuthenticated) return <LandingPage />
  return <MainNavigator />
}
