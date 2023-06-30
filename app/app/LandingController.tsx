/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
import { AntDesign } from '@expo/vector-icons'
import { Prompt, makeRedirectUri } from 'expo-auth-session'
import * as Google from 'expo-auth-session/providers/google'
import * as SecureStore from 'expo-secure-store'
import { StatusBar } from 'expo-status-bar'
import React, { useContext, useEffect } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { api } from '../src/lib/api'
import { getUserData } from '../src/lib/user/UserDataProvider'
import { navigationRef } from '../src/navigation/RootNavigator'
import { AuthContext } from '../src/navigation/providers/AuthProvider'

export default function LandingController() {
  const { login } = useContext(AuthContext)
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
      const user_data = await getUserData()
      login()
      navigationRef.current?.navigate('Home', user_data)
    } catch (err) {
      console.error('Error SignIn: ' + err)
      throw err
    }
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
