import { MaterialCommunityIcons } from '@expo/vector-icons'
import * as SecureStore from 'expo-secure-store'
import React, { useEffect, useState } from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { api } from '../lib/api'
import { getUserToken } from '../lib/auth/AuthTokenProvider'
import { navigationRef } from '../navigation/RootNavigator'

type RecipeList = {
  id: number
  title: string
  count: number
}

const Item = (props: RecipeList) => (
  <TouchableOpacity
    key={props.id}
    onPress={async () => {
      const data = await getListRecipies(props.id)
      navigationRef.current?.navigate('ListRecipies', {
        data,
      })
    }}
  >
    <View className="flex-row px-5">
      <View className="flex h-[100] w-[100] items-center justify-center bg-gray-300">
        <MaterialCommunityIcons
          name="folder-heart-outline"
          size={70}
          color="gray"
        />
      </View>
      <View className="px-3">
        <Text className="font-secondary text-2xl">{props.title}</Text>
        <Text className="text-lg text-[#907676]">{props.count} receitas</Text>
      </View>
    </View>
  </TouchableOpacity>
)

async function getListRecipies(categoryId: number) {
  const token = await getUserToken()
  const response = await api.get(
    `/api/lists/categories/${categoryId}/recipies`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
  return response.data
}

export default function Lists() {
  const [recipiesList, setRecipiesList] = useState<RecipeList[]>([])

  async function loadLists() {
    const token = await SecureStore.getItemAsync('token')
    const recipeList = await api.get('/api/lists/all/categories/count', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    setRecipiesList(recipeList.data)
  }

  useEffect(() => {
    loadLists()
  }, [])

  return (
    <FlatList
      ItemSeparatorComponent={() => <View style={{ height: 30 }} />}
      data={recipiesList}
      renderItem={({ item }) => (
        <Item id={item.id} title={item.title} count={item.count} />
      )}
    />
  )
}
