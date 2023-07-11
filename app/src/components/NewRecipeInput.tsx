import React from 'react'
import { TextInput } from 'react-native'

type NewRecipeInputProps = {
  placeholder: string
}

export const NewRecipeInput: React.FC<NewRecipeInputProps> = ({
  placeholder,
}) => {
  return (
    <TextInput
      className="text-gray-50 h-16 border-b-2 p-0 font-main text-lg"
      placeholder={placeholder}
      placeholderTextColor={'#A99598'}
    />
  )
}
