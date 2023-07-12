import React from 'react'
import TasksController from '../../components/TasksController'
import { RootStackParamList } from '../MainNavigator'
import { StackNavigationProps } from '../RootNavigator'

export const TasksPage: React.FC<
  StackNavigationProps<RootStackParamList, 'Tarefas'>
> = () => {
  return <TasksController />
}
