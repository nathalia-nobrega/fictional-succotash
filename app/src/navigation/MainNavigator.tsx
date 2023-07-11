import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomePage } from './main/HomePage'
import { ListRecipePage } from './main/ListRecipePage'
import { ListsPage } from './main/ListsPage'
import { RecipePage } from './main/RecipePage'
import { TasksPage } from './main/TasksPage'
import { NewRecipePage } from './main/NewRecipePage'

export type RootStackParamList = {
  Inicio: undefined
  Listas: undefined
  Header: undefined
  NovaLista: undefined
  NovaReceita: undefined
  Tarefas: undefined
  Receitas: { data }
  ListRecipies: { data }
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ animation: 'fade' }}>
      <Stack.Screen
        name="Inicio"
        options={{ headerShown: false }}
        component={HomePage}
      />
      <Stack.Screen name="Listas" component={ListsPage} />
      <Stack.Screen name="Tarefas" component={TasksPage} />
      <Stack.Screen name="Receitas" component={RecipePage} />
      <Stack.Screen
        name="ListRecipies"
        options={{ title: 'Receitas na lista' }}
        component={ListRecipePage}
      />
      <Stack.Screen
        name="NovaReceita"
        options={{ title: 'Nova Receita' }}
        component={NewRecipePage}
      />
    </Stack.Navigator>
  )
}
