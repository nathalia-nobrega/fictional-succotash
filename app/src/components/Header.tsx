import { useRoute } from '@react-navigation/native'
import * as SecureStore from 'expo-secure-store'
import { TouchableOpacity, View } from 'react-native'
import { NavigationComponent } from '../../src/components/NavigationComponent'
import UserProfile, { TypeUserProfile } from '../../src/components/UserProfile'
import { navigate } from '../navigation/RootNavigator'
import React from 'react'

export default function Header() {
  const route = useRoute()

  async function logOut() {
    console.log('called it')
    await SecureStore.deleteItemAsync('token')
    navigate('Main')
  }

  return (
    <View className="rounded-br-[60] bg-rose-500">
      <View className="my-8">
        <UserProfile {...(route.params as TypeUserProfile)} />
        <View className="mr-5 flex-row items-center justify-around pt-6">
          <NavigationComponent icon="food-drumstick-outline" title="receitas" />
          <NavigationComponent icon="format-list-checks" title="a fazer" />
          <TouchableOpacity onPress={() => logOut()}>
            <View>
              <NavigationComponent icon="logout" title="sair" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
