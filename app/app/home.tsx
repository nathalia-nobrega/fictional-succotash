import { View } from 'react-native'
import { Props } from '.'
import UserProfile, { TypeUserProfile } from '../src/components/UserProfile'
import NavigationComponent from '../src/components/NavigationComponent'
import React from 'react'

export default function HomeScreen({ route, navigation }: Props) {
  return (
    <View className="rounded-br-[60] bg-rose-500">
      <View className="my-8">
        <UserProfile {...(route.params as TypeUserProfile)} />
        <View className="mr-5 flex-row items-center justify-evenly pt-6">
          <NavigationComponent icon="folder-heart" title="listas" />
          <NavigationComponent icon="format-list-checks" title="sair" />
          <NavigationComponent icon="logout" title="sair" />
        </View>
      </View>
    </View>
  )
}
