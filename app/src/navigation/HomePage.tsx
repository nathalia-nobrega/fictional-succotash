import React from 'react'
import { RootStackParamList } from './MainNavigator'
import { StackNavigationProps } from './RootNavigator'
import { HomeController } from '../../app/HomeController'

export const HomePage: React.FC<
  StackNavigationProps<RootStackParamList, 'Home'>
> = ({ route, navigation }) => {
  return <HomeController user_data={route.params.data} />
}
