import React from 'react'
import { View } from 'react-native'

// TODO: Re-use RecipeDTO type

export type ListRecipeType = {
  id: number
  name: string
  timeToCook: string
  title: string
}

export type ListRecipeControllerProps = {
  data: ListRecipeType[]
}

export const ListRecipeController: React.FC<ListRecipeControllerProps> = ({
  data,
}) => {
  return <View></View>
}
