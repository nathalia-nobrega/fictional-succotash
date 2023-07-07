import React, { useContext } from 'react'
import { FlatList, View } from 'react-native'
import { Item } from '../src/components/Recipies'
import { RecipiesContext } from '../src/components/context/RecipeContext'

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
  // Using this here because, to avoid making a new request to the server, we just search the id of the Item in the current set of Recipies
  const { recipies } = useContext(RecipiesContext)

  // TODO: Handle navigation
  return (
    <View className="mx-8 my-8 flex">
      <FlatList
        scrollEnabled={false}
        ItemSeparatorComponent={() => <View style={{ height: 30 }} />}
        data={data}
        renderItem={({ item }) => (
          <Item
            id={item.id}
            name={item.name}
            timeToCook={item.timeToCook}
            data={recipies.find((obj) => obj.id === item.id)}
          />
        )}
      />
    </View>
  )
}
