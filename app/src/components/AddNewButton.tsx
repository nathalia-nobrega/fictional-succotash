import { AntDesign } from '@expo/vector-icons'
import React from 'react'
import { Text, View } from 'react-native'

type AddNewButtonProps = {
  title: string
}

export const AddNewButton: React.FC<AddNewButtonProps> = ({ title }) => {
  return (
    <View className="flex-row items-center gap-x-2 pb-4">
      <AntDesign name="plus" size={24} color="black" />
      <Text className="font-secondary text-lg">{title}</Text>
    </View>
  )
}
