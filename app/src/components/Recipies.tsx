import * as SecureStore from 'expo-secure-store'
import React, { useEffect, useState } from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { api } from '../lib/api'
import { Ionicons } from '@expo/vector-icons'

type Recipe = {
  id: number
  name: string
  timeToCook: string
}

const Item = (props: Recipe) => (
  <TouchableOpacity key={props.id}>
    <View className="flex gap-y-2 rounded-md bg-gray-300 p-8 px-3">
      <Text className="font-secondary text-lg text-[#AF4949]">
        {props.name}
      </Text>
      <View className="flex-row gap-x-3">
        <Ionicons name="timer-outline" size={20} color="black" />
        <Text className="font-main text-base text-[#918686]">
          {props.timeToCook}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
)

export const Recipies = () => {
  const [recipies, setRecipies] = useState<Recipe[]>([])

  async function loadRecipies() {
    const token = await SecureStore.getItemAsync('token')
    const recipies = await api.get('/api/recipies/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    setRecipies(recipies.data)
  }

  useEffect(() => {
    loadRecipies()
  })

  return (
    <View className="flex items-center">
      <View className="mx-8 my-8">
        <Text className="font-secondary text-2xl">Suas receitas 🥘</Text>
      </View>
      <View>
        <FlatList
          ItemSeparatorComponent={() => <View style={{ height: 30 }} />}
          data={recipies}
          renderItem={({ item }) => (
            <Item id={item.id} name={item.name} timeToCook={item.timeToCook} />
          )}
        />
      </View>
    </View>
  )
}
