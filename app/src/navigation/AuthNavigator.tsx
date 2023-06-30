import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { LandingPage } from './main/LandingPage'

export type AuthStackParamList = {
  Register: undefined
}

const Stack = createNativeStackNavigator<AuthStackParamList>()

export const AuthNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Register" component={LandingPage} />
    </Stack.Navigator>
  )
}
