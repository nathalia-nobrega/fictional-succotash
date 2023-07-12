import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import Lists from './Lists'
import { AddNewButton } from './AddNewButton'

export default function ListsScreen() {
  return (
    <View>
      <View className="flex-row justify-between px-5 py-8">
        <Text className="font-secondary text-2xl">
          Suas listas de receitas 😋
        </Text>
      </View>
      <TouchableOpacity className="mb-3 ml-5">
        <AddNewButton title="Adicionar nova lista" />
      </TouchableOpacity>
      <Lists />
    </View>
  )
}
