import React from 'react'
import { View } from 'react-native'
import { Props } from '.'
import ListRecipe from '../src/components/ListRecipe'
import NavigationComponent from '../src/components/NavigationComponent'
import UserProfile, { TypeUserProfile } from '../src/components/UserProfile'

export default function HomeScreen({ route, navigation }: Props) {
  return (
    <View>
      {/* Start User profile and buttons */}
      <View className="rounded-br-[60] bg-rose-500">
        <View className="my-8">
          <UserProfile {...(route.params as TypeUserProfile)} />
          <View className="mr-5 flex-row items-center justify-around pt-6">
            <NavigationComponent
              icon="food-drumstick-outline"
              title="receitas"
            />
            <NavigationComponent icon="format-list-checks" title="a fazer" />
            <NavigationComponent icon="logout" title="sair" />
          </View>
        </View>
      </View>
      {/* End User profile and buttons */}

      {/* Start Recipe Lists */}
      <ListRecipe />
    </View>
  )
}
