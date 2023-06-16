import { Text, View, Image } from 'react-native'
import { Props } from '.'

type UserProfile = {
  firstName: string
  lastName: string
  email: string
  imageURL: string
}

export default function Main({ route, navigation }: Props) {
  const { firstName, lastName, imageURL, email } = route.params as UserProfile
  return (
    <View className="flex-1 items-center justify-center">
      <Image
        style={{ width: 50, height: 50 }}
        source={{
          uri: imageURL,
        }}
        alt="Sua foto de perfil"
        className="h-9 w-10"
      />
      <Text>{firstName}</Text>
      <Text>{lastName}</Text>
      <Text>{email}</Text>
    </View>
  )
}
