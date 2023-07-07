import React from 'react'
import {
  ListRecipeController,
  ListRecipeType,
} from '../../../app/ListRecipeController'
import { RootStackParamList } from '../MainNavigator'
import { StackNavigationProps } from '../RootNavigator'
import { RecipiesProvider } from '../../components/context/RecipeContext'

export type ListRecipeProps = {
  data: ListRecipeType[]
}

export const ListRecipePage: React.FC<
  StackNavigationProps<RootStackParamList, 'ListRecipe'>
> = ({ navigation, route }) => {
  return (
    <RecipiesProvider>
      <ListRecipeController data={route.params.data} />
    </RecipiesProvider>
  )
}
