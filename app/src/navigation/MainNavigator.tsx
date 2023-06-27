import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { StatusBar } from 'react-native'
import { HomePage } from '../../src/navigation/HomePage'
import { user_data } from '../lib/user_data'
import { ListsPage } from './ListsPage'
import { navigationRef } from './RootNavigator'

export type RootStackParamList = {
  Home: { data }
  Lists: undefined
  Header: undefined
  NewList: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export const MainNavigator = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{ animation: 'fade' }}>
        <Stack.Screen
          name="Home"
          options={{ headerShown: false }}
          component={HomePage}
          initialParams={{ data: user_data }}
        />
        <Stack.Screen name="Lists" component={ListsPage} />
      </Stack.Navigator>
      <StatusBar hidden={true} />
    </NavigationContainer>
  )
}
