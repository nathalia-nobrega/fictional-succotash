import React from 'react'
import { NewRecipeController } from '../../../app/NewRecipeController'
import { RecipiesProvider } from '../../components/context/RecipeContext'
import { RootStackParamList } from '../MainNavigator'
import { StackNavigationProps } from '../RootNavigator'

export const NewRecipePage: React.FC<
  StackNavigationProps<RootStackParamList, 'NovaReceita'>
> = ({ navigation, route }) => {
  return (
    <RecipiesProvider>
      <NewRecipeController />
    </RecipiesProvider>
  )
}
