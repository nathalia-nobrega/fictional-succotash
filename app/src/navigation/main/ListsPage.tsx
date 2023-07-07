import React from 'react'
import ListsController from '../../../app/ListsController'
import { RootStackParamList } from '../MainNavigator'
import { StackNavigationProps } from '../RootNavigator'

export const ListsPage: React.FC<
  StackNavigationProps<RootStackParamList, 'Lists'>
> = ({ navigation, route }) => {
  return <ListsController />
}
