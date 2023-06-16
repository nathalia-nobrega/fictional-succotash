import { Jost_400Regular, useFonts } from '@expo-google-fonts/jost'
import { NavigationContainer, useRoute } from '@react-navigation/native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Prompt, makeRedirectUri } from 'expo-auth-session'
import * as Google from 'expo-auth-session/providers/google'
import * as SecureStore from 'expo-secure-store'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { api } from '../src/lib/api'

const Stack = createNativeStackNavigator()

type RootStackParamList = {
  Home: undefined
  Main: { firstName: string; lastName: string; email: string }
}

type Props = NativeStackScreenProps<RootStackParamList, 'Home', 'Main'>
type MainParams = {
  firstName: string
  lastName: string
  email: string
  imageURL: string
}

function HomeScreen({ navigation }: Props) {
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId:
      '149499266615-719c4ruqoks56148r0pj9fdjgq0arg80.apps.googleusercontent.com',
    scopes: ['profile', 'email'],
    prompt: Prompt.Consent,
    redirectUri: makeRedirectUri({
      useProxy: true,
    }),
    responseType: 'token',
  })

  async function signInWithGoogle(access_token: string) {
    try {
      const token = await api.post('/api/oauth/token', {
        access_token,
      })
      await SecureStore.setItemAsync('token', token.data)
      const secStoreToken = await SecureStore.getItemAsync('token')
      const user = await api.get('/api/users', {
        headers: {
          Authorization: `Bearer ${secStoreToken}`,
        },
      })
      console.log(user.data)
      navigation.navigate('Main')
    } catch (err) {
      console.log('Erro SignIn: ' + err)
      throw err
    }
  }
  useEffect(() => {
    if (response?.type === 'success' && response.authentication?.accessToken) {
      signInWithGoogle(response.authentication.accessToken)
    }
  }, [response])
  return (
    <View style={styles.container} className="bg-red-100">
      <Text
        style={{ fontFamily: 'Jost_400Regular', fontSize: 40 }}
        className="bg-red-800"
      ></Text>
      <Button
        title="Sign in with Google"
        disabled={!request}
        onPress={() => {
          promptAsync()
        }}
      />
      <StatusBar style="auto" />
    </View>
  )
}

function Main({ navigation }: Props) {
  const route = useRoute()
  const { firstName, lastName } = route.params as MainParams
  return (
    <View>
      <Text>asfguysdionusgdfyou</Text>
      {/* <Text>Hey, {JSON.stringify(firstName)}</Text>
      <Text>Is your email {JSON.stringify(email)}</Text> */}
    </View>
  )
}

export default function App() {
  const [fontsLoaded] = useFonts({
    Jost_400Regular,
  })

  if (!fontsLoaded) return null

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>
        <Stack.Screen name="Main" component={Main}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
