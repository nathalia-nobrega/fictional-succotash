import React from 'react'
import { ScrollView } from 'react-native'
import { Header } from '../src/components/Header'
import { Recipies } from '../src/components/Recipies'
import { RecipiesProvider } from '../src/components/context/RecipeContext'

export type HomeControllerProps = {
  user_data: any
}

export const HomeController: React.FC<HomeControllerProps> = ({
  user_data,
}) => {
  return (
    <ScrollView keyboardShouldPersistTaps="always">
      <RecipiesProvider>
        <Header user_data={user_data} />
        <Recipies />
      </RecipiesProvider>
    </ScrollView>
  )
}
