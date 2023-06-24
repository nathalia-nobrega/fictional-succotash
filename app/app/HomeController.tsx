import React from 'react'
import { ScrollView, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Header from '../src/components/Header'
import ListRecipe from '../src/components/ListRecipe'

export type HomeControllerProps = {
  user_data: any
}

export const HomeController: React.FC<HomeControllerProps> = ({
  user_data,
}) => {
  const { bottom, top } = useSafeAreaInsets()
  return (
    <ScrollView
      className="flex"
      contentContainerStyle={{ paddingBottom: bottom, paddingTop: top }}
    >
      <View>
        <Header />
        <ListRecipe />
      </View>
    </ScrollView>
  )
}
