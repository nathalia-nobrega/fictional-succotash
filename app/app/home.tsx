import React from 'react'
import { ScrollView, View } from 'react-native'
import { Props } from '.'
import ListRecipe from '../src/components/ListRecipe'
import Layout from './_layout'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function HomeScreen({ route, navigation }: Props) {
  const { bottom, top } = useSafeAreaInsets()
  return (
    <ScrollView
      className="flex"
      contentContainerStyle={{ paddingBottom: bottom, paddingTop: top }}
    >
      <View>
        {/* Start User profile and buttons */}
        <Layout route={route} navigation={navigation} />
        {/* End User profile and buttons */}

        {/* Start Recipe Lists */}

        <ListRecipe />
      </View>
    </ScrollView>
  )
}
