import React from 'react'
import ListsController from '../../../app/ListsController'
import { StackNavigationProps } from '../RootNavigator'
import { RootStackParamList } from '../MainNavigator'

export const ListsPage: React.FC<
  StackNavigationProps<RootStackParamList, 'Lists'>
> = ({ navigation }) => {
  return <ListsController />
}
