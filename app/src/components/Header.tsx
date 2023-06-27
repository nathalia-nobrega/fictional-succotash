import { useRoute } from '@react-navigation/native'
import * as SecureStore from 'expo-secure-store'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { NavigationComponent } from '../../src/components/NavigationComponent'
import UserProfile, { TypeUserProfile } from '../../src/components/UserProfile'
import { navigate, navigationRef } from '../navigation/RootNavigator'

export default function Header() {
  const route = useRoute()

  async function logOut() {
    await SecureStore.deleteItemAsync('token')
    // navigate('')
    console.log('logout')
  }

  return (
    <View className="rounded-br-[60] bg-rose-500">
      <View className="my-8">
        <UserProfile {...(route.params as TypeUserProfile)} />
        <View className="mr-5 flex-row items-center justify-around pt-6">
          <TouchableOpacity
            onPress={() => {
              navigate('Lists')
              navigationRef.current?.canGoBack()
            }}
          >
            <NavigationComponent icon="format-list-bulleted" title="listas" />
          </TouchableOpacity>

          <TouchableOpacity>
            <NavigationComponent icon="format-list-checks" title="tarefas" />
          </TouchableOpacity>
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
