import { AntDesign } from '@expo/vector-icons'
import React from 'react'
import { TextInput, View } from 'react-native'

export const RecipeLinkInput: React.FC = () => {
  return (
    <View className="border-b-1 mt-6 flex-row items-center pb-2">
      <AntDesign name="link" size={24} color="black" />
      <TextInput
        className="text-gray-50 m-2 h-12 flex-1 border-b-2 font-main text-lg"
        placeholder="Link (opcional)"
        placeholderTextColor={'#A99598'}
      />
    </View>
  )
}
