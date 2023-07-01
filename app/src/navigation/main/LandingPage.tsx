import React from 'react'
import LandingController from '../../../app/LandingController'
import { StackNavigationProps } from '../RootNavigator'
import { AuthStackParamList } from '../AuthNavigator'

export const LandingPage: React.FC<
  StackNavigationProps<AuthStackParamList, 'Register'>
> = ({ navigation }) => {
  return <LandingController />
}
