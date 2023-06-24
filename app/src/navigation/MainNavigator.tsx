import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StatusBar } from 'react-native'
import { HomePage } from '../../src/navigation/HomePage'
import { MainPage } from '../../src/navigation/MainPage'
import { navigationRef } from './RootNavigator'
import React from 'react'

export type RootStackParamList = {
  Main: undefined
  Home: { data }
  Recipies: undefined
  Header: undefined
  NewList: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export const MainNavigator = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Main" component={MainPage} />
        <Stack.Screen name="Home" component={HomePage} />
      </Stack.Navigator>
      <StatusBar hidden={true} />
    </NavigationContainer>
  )
}
