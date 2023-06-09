import { Ionicons } from '@expo/vector-icons'
import React, { useContext } from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { navigationRef } from '../navigation/RootNavigator'
import { RecipeDTO, RecipiesContext } from './context/RecipeContext'

// TODO: Make this reusable

export const Item = (props: RecipeDTO) => (
  <TouchableOpacity
    key={props.id}
    onPress={() => {
      navigationRef.current?.navigate('Receitas', { data: props.data })
    }}
  >
    <View className="flex gap-y-2 rounded-md bg-[#ffa8b8] p-8 px-3">
      <Text className="font-secondary text-lg text-[#574145]">
        {props.name}
      </Text>
      <View className="flex-row gap-x-3">
        <Ionicons name="timer-outline" size={20} color="black" />
        <Text className="font-main text-base text-[#5b1329]">
          {props.timeToCook == null ? <>N/A</> : <>{props.timeToCook}</>}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
)

export const Recipies = () => {
  const { recipies } = useContext(RecipiesContext)
  return (
    <View className="mx-8 my-8 flex">
      <Text className="mb-8 mt-1 font-secondary text-2xl">
        Suas receitas 🥘
      </Text>
      <FlatList
        scrollEnabled={false}
        ItemSeparatorComponent={() => <View style={{ height: 30 }} />}
        data={recipies}
        renderItem={({ item }) => (
          <Item
            id={item.id}
            name={item.name}
            timeToCook={item.timeToCook}
            data={recipies.find((obj) => obj.id === item.id)}
          />
        )}
      />
      <View className="my-10 flex items-center justify-center">
        <TouchableOpacity
          className="w-[200] rounded-full bg-rose-600 p-3"
          onPress={() => navigationRef.current?.navigate('NovaReceita')}
        >
          <Text className="text-center font-secondary uppercase text-[#fff]">
            Criar nova receita
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
