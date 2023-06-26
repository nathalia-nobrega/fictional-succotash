import { MaterialCommunityIcons } from '@expo/vector-icons'
import React from 'react'
import { Text, View } from 'react-native'

export type MaterialIconName = React.ComponentProps<
  typeof MaterialCommunityIcons
>['name']

type Props = {
  icon: MaterialIconName
  title: string
}
export const NavigationComponent: React.FC<Props> = ({ icon, title }) => {
  return (
    <View>
      <View className="mb-2 h-[45] w-[45] flex-col items-center justify-center rounded-md bg-gray-300/50">
        <MaterialCommunityIcons name={icon} size={35} color="black" />
      </View>
      <Text className="text-center font-main uppercase text-[#fff]">
        {title}
      </Text>
    </View>
  )
}
