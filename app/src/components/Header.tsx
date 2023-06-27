import * as SecureStore from 'expo-secure-store'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { NavigationComponent } from '../../src/components/NavigationComponent'
import UserProfile from '../../src/components/UserProfile'
import { TypeUserProfile } from '../lib/user/TypeUserProfile'
import { navigationRef } from '../navigation/RootNavigator'

export const Header: React.FC<{ user_data: TypeUserProfile }> = ({
  user_data,
}) => {
  async function logOut() {
    await SecureStore.deleteItemAsync('token')
    console.info('DESLOGAR')
    // navigationRef.current?.navigate('Switch')
  }

  return (
    <View className="rounded-br-[60] bg-rose-500">
      <View className="my-8">
        <UserProfile {...user_data} />
        <View className="mr-5 flex-row items-center justify-around pt-6">
          <TouchableOpacity
            onPress={() => {
              navigationRef.current?.navigate('Lists')
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
