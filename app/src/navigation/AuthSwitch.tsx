import {
  Jost_400Regular,
  Jost_500Medium,
  Jost_700Bold,
  useFonts,
} from '@expo-google-fonts/jost'
import { NavigationContainer } from '@react-navigation/native'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { getUserToken } from '../lib/auth/AuthTokenProvider'
import { AuthNavigator } from './AuthNavigator'
import { MainNavigator } from './MainNavigator'
import { navigationRef } from './RootNavigator'
import { AuthContext } from './providers/AuthProvider'

SplashScreen.preventAutoHideAsync()

export const AuthSwitch = () => {
  const [appIsReady, setAppIsReady] = useState(false)
  const { isUserAuthenticated, login } = useContext(AuthContext)

  const [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_500Medium,
    Jost_700Bold,
  })

  useEffect(() => {
    async function prepare() {
      try {
        const token = async () => {
          const secToken = await getUserToken()
          if (secToken) login()
        }
        token()
      } catch (err) {
        console.warn(err)
      } finally {
        setAppIsReady(true)
      }
    }

    prepare()
  })

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) await SplashScreen.hideAsync()
  }, [appIsReady])

  if (!appIsReady) {
    return null
  }
  if (!fontsLoaded) return null

  return (
    <NavigationContainer ref={navigationRef} onReady={onLayoutRootView}>
      {isUserAuthenticated ? <MainNavigator /> : <AuthNavigator />}
      <StatusBar hidden={true} />
    </NavigationContainer>
  )
}
