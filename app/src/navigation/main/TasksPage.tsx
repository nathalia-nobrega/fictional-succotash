import React from 'react'
import Tasks from '../../components/Tasks'
import { StackNavigationProps } from '../RootNavigator'
import { RootStackParamList } from '../MainNavigator'

export const TasksPage: React.FC<
  StackNavigationProps<RootStackParamList, 'Tasks'>
> = () => {
  return <Tasks />
}
