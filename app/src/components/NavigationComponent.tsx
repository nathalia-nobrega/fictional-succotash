import { Text, View } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export type MaterialIconName = React.ComponentProps<
  typeof MaterialCommunityIcons
>['name']

type Props = {
  icon: MaterialIconName
  title: string
}
export default function NavigationComponent(props: Props) {
  return (
    <View>
      <View className="mb-2 h-[45] w-[45] flex-col items-center justify-center rounded-md bg-gray-300/50">
        <MaterialCommunityIcons name={props.icon} size={35} color="black" />
      </View>
      <Text className="text-center font-main uppercase text-[#fff]">
        {props.title}
      </Text>
    </View>
  )
}
