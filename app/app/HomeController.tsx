import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { Header } from '../src/components/Header'
import { RootStackParamList } from '../src/navigation/MainNavigator'

export type HomeControllerProps = {
  user_data: any
}

export const HomeController: React.FC<HomeControllerProps> = ({
  user_data,
}) => {
  const navigation = useNavigation<RootStackParamList>()
  return (
    <ScrollView className="flex">
      <View>
        <Header user_data={user_data} />
        <TouchableOpacity onPress={() => navigation.Lists}>
          <Text>your recipies here</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}
