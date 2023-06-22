import React from 'react'
import { ScrollView, View } from 'react-native'
import { Props } from '.'
import ListRecipe from '../src/components/ListRecipe'
import Layout from './_layout'

export default function HomeScreen({ route, navigation }: Props) {
  return (
    <ScrollView className="flex">
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
