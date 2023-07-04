import React, { useState } from 'react'
import { Text, View } from 'react-native'
import RecipeInfo from '../src/components/RecipeInfo'

export type Recipe = {
  name: string
  timeToCook: string
  ingredients: string[]
  instructions: string | null
  portionsQtd: string | null
  mediaLinks: string[]
}
export type RecipeControllerProps = {
  data: Recipe
}

// TODO: Handle responsive empty arrays
export const RecipeController: React.FC<RecipeControllerProps> = ({ data }) => {
  const [recipe, setRecipe] = useState(data)

  console.info(recipe)
  return (
    <View>
      <View>
        <Text className="mt-6 text-center font-secondary text-3xl text-[#AF4949]">
          {recipe.name}
        </Text>
      </View>

      <View className="mx-8 my-8 flex">
        <RecipeInfo
          infoTitle="Links úteis"
          infoItemCount={recipe.mediaLinks.length}
          infoData={recipe.mediaLinks}
        />
        <RecipeInfo
          infoTitle="Ingredientes"
          infoItemCount={recipe.ingredients.length}
          infoData={recipe.ingredients}
        />
        <RecipeInfo
          infoTitle="Porções"
          infoData={recipe.portionsQtd}
          infoItemCount={null}
        />
        <RecipeInfo
          infoTitle="Tempo de preparação"
          infoItemCount={null}
          infoData={recipe.timeToCook}
        />
      </View>
    </View>
  )
}
