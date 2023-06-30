import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomePage } from './main/HomePage'
import { ListsPage } from './main/ListsPage'
import { TasksPage } from './main/TasksPage'

export type RootStackParamList = {
  Home: undefined
  Lists: undefined
  Header: undefined
  NewList: undefined
  Tasks: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ animation: 'fade', headerShown: false }}>
      <Stack.Screen
        name="Home"
        options={{ headerShown: false }}
        component={HomePage}
      />
      <Stack.Screen name="Lists" component={ListsPage} />
      <Stack.Screen name="Tasks" component={TasksPage} />
    </Stack.Navigator>
  )
}
