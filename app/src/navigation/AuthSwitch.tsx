import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import React, { useContext, useEffect, useState } from 'react'
import { ActivityIndicator } from 'react-native'
import { getUserToken } from '../lib/auth/AuthTokenProvider'
import { AuthNavigator } from './AuthNavigator'
import { MainNavigator } from './MainNavigator'
import { navigationRef } from './RootNavigator'
import { AuthContext } from './providers/AuthProvider'

export const AuthSwitch = () => {
  const { isUserAuthenticated, login } = useContext(AuthContext)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const token = async () => {
      const secToken = await getUserToken()
      if (secToken) login()
      setLoading(false)
    }
    token()
  })

  if (loading) {
    return <ActivityIndicator size={'large'}></ActivityIndicator>
  }
  return (
    <NavigationContainer ref={navigationRef}>
      {isUserAuthenticated ? <MainNavigator /> : <AuthNavigator />}
      <StatusBar hidden={true} />
    </NavigationContainer>
  )
}
