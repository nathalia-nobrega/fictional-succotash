import React from 'react'
import { hasToken } from '../../utils/VerifyToken'
import { LandingPage } from './LandingPage'
import { MainNavigator } from './MainNavigator'

export default function AuthenticationSwitch() {
  if (!hasToken) return <LandingPage />
  return <MainNavigator />
}
