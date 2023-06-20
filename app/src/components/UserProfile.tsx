import { Image, Text, View } from 'react-native'

export type TypeUserProfile = {
  firstName: string
  lastName: string
  email: string
  imageURL: string
}

export default function UserProfile(props: TypeUserProfile) {
  const { firstName, lastName, email, imageURL } = props
  return (
    <View>
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
