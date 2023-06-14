import { Jost_400Regular, useFonts } from '@expo-google-fonts/jost'
import { Prompt, makeRedirectUri } from 'expo-auth-session'
import * as Google from 'expo-auth-session/providers/google'
import { useRouter } from 'expo-router'
import * as SecureStore from 'expo-secure-store'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { api } from '../src/lib/api'

export default function App() {
  const router = useRouter()
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
      console.log(SecureStore.getItemAsync('token'))
      router.push('/main')
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

  const [fontsLoaded] = useFonts({
    Jost_400Regular,
  })

  if (!fontsLoaded) return null

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
