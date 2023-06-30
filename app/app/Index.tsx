import {
  Jost_400Regular,
  Jost_500Medium,
  useFonts,
} from '@expo-google-fonts/jost'
import React from 'react'
import { Providers } from '../src/navigation/providers/Providers'

export default function App() {
  const [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_500Medium,
  })

  if (!fontsLoaded) return null

  return <Providers />
}
