import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { StatusBar } from 'react-native'
import { HomePage } from '../../src/navigation/HomePage'
import { MainPage } from '../../src/navigation/MainPage'
import { ListsPage } from './ListsPage'
import { navigationRef } from './RootNavigator'

export type RootStackParamList = {
  Main: undefined
  Home: { data }
  Lists: undefined
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
        <Stack.Screen name="Lists" component={ListsPage} />
      </Stack.Navigator>
      <StatusBar hidden={true} />
    </NavigationContainer>
  )
}
