import React from 'react'
import { RecipeController } from '../../../app/RecipeController'
import { RootStackParamList } from '../MainNavigator'
import { StackNavigationProps } from '../RootNavigator'

export const RecipePage: React.FC<
  StackNavigationProps<RootStackParamList, 'Recipe'>
> = ({ navigation, route }) => {
  return <RecipeController data={route.params.data} />
}
