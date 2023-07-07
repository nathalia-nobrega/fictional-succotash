import React, { useState } from 'react'
import { Text, View } from 'react-native'
import RecipeInfo from '../src/components/RecipeInfo'

export type Recipe = {
  id?: number
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

export const RecipeController: React.FC<RecipeControllerProps> = ({ data }) => {
  const [recipe, setRecipe] = useState(data)

  return (
    <View className="flex-1 bg-[#fff]">
      <View>
        <Text className="mx-6 mt-8 text-center font-secondary text-3xl text-[#AF4949]">
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
          infoTitle="Porções geradas"
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
