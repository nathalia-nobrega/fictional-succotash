import { MaterialCommunityIcons } from '@expo/vector-icons'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import NewListButton from './NewListButton'
import Lists from './Lists'

export default function ListRecipe() {
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
