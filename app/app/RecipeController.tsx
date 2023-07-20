import React, { useState } from 'react'
import { Alert, Text, TouchableOpacity, View } from 'react-native'
import RecipeInfo from '../src/components/RecipeInfo'

export type Recipe = {
  id?: number
  name: string
  ingredients: string[]
  instructions: string | null
  portionsQtd: string | null
  timeToCook: string
  mediaLinks: string[]
}
export type RecipeControllerProps = {
  data: Recipe
}

export const RecipeController: React.FC<RecipeControllerProps> = ({ data }) => {
  const [recipe, setRecipe] = useState(data)
  const createThreeButtonAlert = () =>
    Alert.alert('', 'Tem certeza que deseja excluir essa receita?', [
      {
        text: 'Sim, quero excluir!',
      },
      { text: 'Não quero excluir' },
    ])
  console.info('RecipeController.tsx got data: ', data)

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
      {/* TODO: Implement this */}
      <View className="flex items-center justify-center">
        <TouchableOpacity
          className="flex h-12 w-36 justify-center rounded-full bg-red-400 p-2"
          onPress={createThreeButtonAlert}
        >
          <Text className="text-center uppercase text-[#fff]">
            excluir receita
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
