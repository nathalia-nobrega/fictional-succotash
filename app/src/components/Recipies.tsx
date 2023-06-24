import { MaterialCommunityIcons } from '@expo/vector-icons'
import * as SecureStore from 'expo-secure-store'
import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { api } from '../lib/api'

interface RecipeList {
  id: number
  title: string
  count: number
}

export default function Recipies() {
  const [recipiesList, setRecipiesList] = useState<RecipeList[]>([])

  async function loadLists() {
    const token = await SecureStore.getItemAsync('token')
    const recipeList = await api.get('/api/lists/all/categories/count', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    console.log(recipeList.data)
    setRecipiesList(recipeList.data)
  }

  useEffect(() => {
    loadLists()
  }, [])
  return (
    <View className="flex gap-6">
      {recipiesList.map((list) => {
        return (
          <TouchableOpacity key={list.id}>
            <View className="flex-row px-5">
              <View className="flex h-[100] w-[100] items-center justify-center bg-gray-300">
                <MaterialCommunityIcons
                  name="folder-heart-outline"
                  size={70}
                  color="gray"
                />
              </View>
              <View className="px-3">
                <Text className="font-secondary text-2xl">{list.title}</Text>
                <Text className="text-lg text-[#907676]">
                  {list.count} receitas
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}
