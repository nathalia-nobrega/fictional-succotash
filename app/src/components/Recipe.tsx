import { MaterialCommunityIcons } from '@expo/vector-icons'
import * as SecureStore from 'expo-secure-store'
import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { api } from '../lib/api'

interface RecipeList {
  id: number
  title: string
  userId: string
}

export default function Recipe() {
  const [recipiesList, setRecipiesList] = useState<RecipeList[]>([])

  async function loadLists() {
    const token = await SecureStore.getItemAsync('token')
    const recipeList = await api.get('/api/categories', {
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
    <View>
      {recipiesList.map((list) => {
        return (
          <View key={list.id} className="flex-row px-5">
            <View className="flex h-[100] w-[100] items-center justify-center bg-gray-300">
              <MaterialCommunityIcons
                name="folder-heart-outline"
                size={70}
                color="gray"
              />
            </View>
            <Text className="text-[#907676]">{list.title}</Text>
          </View>
        )
      })}
    </View>
  )
}
