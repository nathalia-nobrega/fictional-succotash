import {
  Jost_400Regular,
  Jost_500Medium,
  useFonts,
} from '@expo-google-fonts/jost'
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import HomeScreen from './home'
import Main from './main'
import { StatusBar } from 'expo-status-bar'

export const navigationRef = createNavigationContainerRef()

const Stack = createNativeStackNavigator()

type RootStackParamList = {
  Main: undefined
  Home: { data }
}

export type Props = NativeStackScreenProps<RootStackParamList, 'Main', 'Home'>

export default function App() {
  const [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_500Medium,
  })

  if (!fontsLoaded) return null

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
      <StatusBar hidden={true} />
    </NavigationContainer>
  )
}
