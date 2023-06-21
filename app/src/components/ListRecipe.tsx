import { AntDesign } from '@expo/vector-icons'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import Recipe from './Recipe'

export default function ListRecipe() {
  return (
    <View>
      <View className="flex-row justify-between px-5 py-10">
        <Text className="font-secondary text-2xl">
          Suas listas de receitas 😋
        </Text>
        <TouchableOpacity>
          <AntDesign name="plus" size={28} color="black" />
        </TouchableOpacity>
      </View>
      {/* START Recipe Lists */}
      <Recipe />
      {/* END Recipe Lists */}
    </View>
  )
}
