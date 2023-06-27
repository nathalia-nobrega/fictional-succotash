import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import Header from '../src/components/Header'

export type HomeControllerProps = {
  user_data: any
}

export const HomeController: React.FC = () => {
  return (
    <ScrollView className="flex">
      <View>
        {/* <Header /> */}
        <Text>your recipies here</Text>
      </View>
    </ScrollView>
  )
}
