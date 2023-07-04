import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomePage } from './main/HomePage'
import { ListsPage } from './main/ListsPage'
import { RecipePage } from './main/RecipePage'
import { TasksPage } from './main/TasksPage'

export type RootStackParamList = {
  Home: undefined
  Lists: undefined
  Header: undefined
  NewList: undefined
  Tasks: undefined
  Recipe: { data }
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ animation: 'fade' }}>
      <Stack.Screen
        name="Home"
        options={{ headerShown: false }}
        component={HomePage}
      />
      <Stack.Screen name="Lists" component={ListsPage} />
      <Stack.Screen name="Tasks" component={TasksPage} />
      <Stack.Screen name="Recipe" component={RecipePage} />
    </Stack.Navigator>
  )
}
