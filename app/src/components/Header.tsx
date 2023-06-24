import { useRoute } from '@react-navigation/native'
import { TouchableOpacity, View } from 'react-native'
import NavigationComponent from '../../src/components/NavigationComponent'
import UserProfile, { TypeUserProfile } from '../../src/components/UserProfile'
import * as SecureStore from 'expo-secure-store'
import { navigationRef } from '../navigation/RootNavigator'

export default function Header() {
  const route = useRoute()

  async function logOut() {
    await SecureStore.deleteItemAsync('token')
    navigationRef.current?.navigate('Main')
  }

  return (
    <View className="rounded-br-[60] bg-rose-500">
      <View className="my-8">
        <UserProfile {...(route.params as TypeUserProfile)} />
        <View className="mr-5 flex-row items-center justify-around pt-6">
          <NavigationComponent icon="food-drumstick-outline" title="receitas" />
          <NavigationComponent icon="format-list-checks" title="a fazer" />
          <TouchableOpacity onPress={logOut}>
            <NavigationComponent icon="logout" title="sair" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
