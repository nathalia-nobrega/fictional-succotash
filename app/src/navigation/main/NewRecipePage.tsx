import { NewRecipeController } from '../../../app/NewRecipeController'
import { RootStackParamList } from '../MainNavigator'
import { StackNavigationProps } from '../RootNavigator'
import React from 'react'

export const NewRecipePage: React.FC<
  StackNavigationProps<RootStackParamList, 'NovaReceita'>
> = ({ navigation, route }) => {
  return <NewRecipeController />
}
