import * as SecureStore from 'expo-secure-store'
import React, { useContext } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { HeaderButton } from '../../src/components/HeaderButton'
import UserProfile from '../../src/components/UserProfile'
import { TypeUserProfile } from '../lib/user/UserProfileType'
import { navigationRef } from '../navigation/RootNavigator'
import { AuthContext } from '../navigation/providers/AuthProvider'

export const Header: React.FC<{ user_data: TypeUserProfile }> = ({
  user_data,
}) => {
  const { logout } = useContext(AuthContext)
  async function logOut() {
    logout()
    await SecureStore.deleteItemAsync('token')
  }

  return (
    <View className="rounded-br-[60] bg-rose-500">
      <View className="my-8">
        <UserProfile {...user_data} />
        <View className="mr-5 flex-row items-center justify-around pt-6">
          <TouchableOpacity
            onPress={() => {
              navigationRef.current?.navigate('Listas')
            }}
          >
            <HeaderButton icon="format-list-bulleted" title="listas" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigationRef.current?.navigate('Tarefas')}
          >
            <HeaderButton icon="format-list-checks" title="tarefas" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              logOut()
            }}
          >
            <View>
              <HeaderButton icon="logout" title="sair" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
