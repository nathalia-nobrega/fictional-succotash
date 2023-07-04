import React from 'react'
import {
  ListRecipeController,
  ListRecipeType,
} from '../../../app/ListRecipeController'
import { RootStackParamList } from '../MainNavigator'
import { StackNavigationProps } from '../RootNavigator'

export type ListRecipeProps = {
  data: ListRecipeType[]
}

export const ListRecipePage: React.FC<
  StackNavigationProps<RootStackParamList, 'ListRecipe'>
> = ({ navigation, route }) => {
  return <ListRecipeController data={route.params.data} />
}
