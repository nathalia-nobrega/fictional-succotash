import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { Entypo } from '@expo/vector-icons'

export type Recipe = {
  name: string
  timeToCook: string
  ingredients: string[]
  instructions: string | null
  portionsQtd: number | null
  mediaLinks: string[]
}
export type RecipeControllerProps = {
  data: Recipe
}

// TODO: Handle responsive empty arrays
export const RecipeController: React.FC<RecipeControllerProps> = ({ data }) => {
  const [recipe, setRecipe] = useState(data)
  const [mediaLinks, setMediaLinks] = useState<string[]>(recipe.mediaLinks)
  const [ingredients, setIngredients] = useState<string[]>(recipe.ingredients)

  return (
    <View className="m-5">
      <Text className="font-secondary text-3xl text-[#AF4949]">
        {recipe.name}
      </Text>
      <Text>{recipe.mediaLinks.length}</Text>
      <Text>{recipe.timeToCook}</Text>
      <Text>{recipe.ingredients}</Text>
      <Text>{recipe.instructions}</Text>
      <Text>{recipe.portionsQtd}</Text>
    </View>
  )
}
