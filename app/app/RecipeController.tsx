import React, { useState } from 'react'
import { FlatList, Text, View } from 'react-native'

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

  console.info(recipe)
  return (
    <View className="flex gap-2">
      <View className="flex gap-6">
        <Text className="font-secondary text-3xl text-[#AF4949]">
          {recipe.name}
        </Text>
      </View>

      <View className="flex gap-8">
        <View>
          <Text className="font-main text-3xl">Links úteis</Text>
          <Text>
            {mediaLinks.length === 0 ? (
              <>N/A</>
            ) : (
              <FlatList
                scrollEnabled={false}
                data={mediaLinks}
                renderItem={({ item }) => <Text>{item.valueOf()}</Text>}
              />
            )}
          </Text>
        </View>
        <View>
          <Text className="font-main text-3xl">Ingredientes</Text>
          {ingredients.length === 0 ? (
            <></>
          ) : (
            <FlatList
              scrollEnabled={false}
              data={ingredients}
              renderItem={({ item }) => (
                <Text className="font-secondary text-lg">{item.valueOf()}</Text>
              )}
            />
          )}
        </View>
        <View>
          <Text className="font-main text-3xl">Porções</Text>
          {recipe.portionsQtd === null ? (
            <></>
          ) : (
            <Text className="font-secondary text-lg">{recipe.portionsQtd}</Text>
          )}
        </View>
        <View>
          <Text className="font-main text-3xl">Tempo de preparação</Text>
          <Text className="font-secondary text-lg">{recipe.timeToCook}</Text>
        </View>
      </View>
    </View>
  )
}
