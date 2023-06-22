import React from 'react'
import { Image, Text, View } from 'react-native'

export type TypeUserProfile = {
  firstName: string
  lastName: string
  email: string
  imageURL: string
}

export default function UserProfile(props: TypeUserProfile) {
  const { firstName, lastName, email, imageURL } = props
  return (
    <View className="mx-2 flex-row items-center justify-start">
      <Image
        style={{ width: 40, height: 40 }}
        source={{
          uri: imageURL,
        }}
        alt="Sua foto de perfil"
        className="mx-4 h-10 w-10 rounded-full"
      />
      <Text className="decoration- font-main text-2xl text-[#ffffff]">
        Olá, {firstName}!
      </Text>
    </View>
  )
}
