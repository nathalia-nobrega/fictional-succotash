import * as SplashScreen from 'expo-splash-screen'
import React from 'react'
import { Providers } from '../src/navigation/providers/Providers'

SplashScreen.preventAutoHideAsync()

export default function App() {
  return <Providers />
}
