/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
import { AntDesign } from '@expo/vector-icons'
import { Prompt, makeRedirectUri } from 'expo-auth-session'
import * as Google from 'expo-auth-session/providers/google'
import * as SecureStore from 'expo-secure-store'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { api } from '../src/lib/api'
import { navigationRef } from '../src/navigation/RootNavigator'

export default function MainController() {
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
  useEffect(() => {
    SecureStore.getItemAsync('token').then(async (token) => {
      const isUserAuthenticated = !!token
      if (isUserAuthenticated) navigateToHome()
    })
  }, [!request])
  async function getUserData(jwt_token: string) {
    const secureToken = await SecureStore.getItemAsync('token')
    const user = await api.get('/api/users', {
      headers: {
        Authorization: `Bearer ${secureToken}`,
      },
    })
    return user.data
  }

  async function signInWithGoogle(access_token: string) {
    try {
      const token = await api.post('/api/oauth/token', {
        access_token,
      })
      await SecureStore.setItemAsync('token', token.data)
      const secureToken = await SecureStore.getItemAsync('token')
      console.log(secureToken)
      const user_data = await getUserData(secureToken)
      navigationRef.current?.navigate('Home', user_data)
    } catch (err) {
      console.log('Erro SignIn: ' + err)
      throw err
    }
  }

  async function navigateToHome() {
    const secureToken = await SecureStore.getItemAsync('token')
    const user_data = await getUserData(secureToken)
    navigationRef.current?.navigate('Home', user_data)
  }

  useEffect(() => {
    if (response?.type === 'success' && response.authentication?.accessToken) {
      signInWithGoogle(response.authentication.accessToken)
    }
  }, [response])
  return (
    <View className="flex-1 items-center gap-y-16 bg-[#fff]">
      <View className="flex items-center justify-center gap-16">
        <Image source={require('../assets/loginPic.png')} alt="SVG Picture" />
        <Text className="w-80 text-justify font-main text-lg">
          But it feels good to be known so well I can't hide from you like I
          hide from myself I remember who I am when I'm with you Your love is
          tough, your love is tried and true blue Ooh-ooh
        </Text>
      </View>
      <TouchableOpacity
        className="bg-red-800 w-80 flex-row items-center justify-center rounded-md bg-rose-500 p-5"
        disabled={!request}
        onPress={() => {
          promptAsync()
        }}
      >
        <AntDesign name="google" size={20} color="white" />
        <Text className="ml-4 font-main text-xl text-[#fff]">
          Entre com o Google
        </Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  )
}
