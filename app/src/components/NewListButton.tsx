import { Text, TouchableOpacity, View } from 'react-native'

export default function NewListButton() {
  return (
    <View className="my-10 flex items-center justify-center">
      <TouchableOpacity className="w-[200] rounded-full bg-rose-600 p-3">
        <Text className="text-center font-secondary uppercase text-[#fff]">
          Criar nova lista
        </Text>
      </TouchableOpacity>
    </View>
  )
}
