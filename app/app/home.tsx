import { View } from 'react-native'
import { Props } from '.'
import UserProfile, { TypeUserProfile } from '../src/components/UserProfile'

export default function HomeScreen({ route, navigation }: Props) {
  return (
    <View className="flex-1 items-center justify-center">
      <UserProfile {...(route.params as TypeUserProfile)} />
    </View>
  )
}
