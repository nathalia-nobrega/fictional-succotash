import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { ScrollView, View } from 'react-native'
import { Header } from '../src/components/Header'
import { Recipies } from '../src/components/Recipies'
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
        <Recipies />
      </View>
    </ScrollView>
  )
}
