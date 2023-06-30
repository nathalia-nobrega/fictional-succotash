import React from 'react'
import { AuthSwitch } from '../AuthSwitch'
import { AuthProvider } from './AuthProvider'

export const Providers = () => {
  return (
    <AuthProvider>
      <AuthSwitch />
    </AuthProvider>
  )
}
