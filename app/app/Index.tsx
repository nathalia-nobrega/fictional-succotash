import {
  Jost_400Regular,
  Jost_500Medium,
  useFonts,
} from '@expo-google-fonts/jost'
import React from 'react'
import { MainNavigator } from '../src/navigation/MainNavigator'

export default function App() {
  const [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_500Medium,
  })

  if (!fontsLoaded) return null

  return <MainNavigator />
}
