import { MaterialCommunityIcons } from '@expo/vector-icons'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import Lists from './Lists'
import NewListButton from './NewListButton'

export default function ListsScreen() {
  return (
    <View>
      <View className="flex-row justify-between px-5 py-10">
        <Text className="font-secondary text-2xl">
          Suas listas de receitas 😋
        </Text>
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="help-circle-outline"
            size={28}
            color="black"
          />
        </TouchableOpacity>
      </View>
      <Lists />
      <NewListButton />
    </View>
  )
}
