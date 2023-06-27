import * as SecureStore from 'expo-secure-store'
export const getUserToken = async () => {
  const token = await SecureStore.getItemAsync('token')
  return token
}
