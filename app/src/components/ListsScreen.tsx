import { MaterialCommunityIcons } from '@expo/vector-icons'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import Lists from './Lists'

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
      <View className="my-10 flex items-center justify-center">
        <TouchableOpacity className="w-[200] rounded-full bg-rose-600 p-3">
          <Text className="text-center font-secondary uppercase text-[#fff]">
            Criar nova lista
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
