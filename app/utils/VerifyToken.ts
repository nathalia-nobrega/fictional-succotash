import SecureStore from 'expo-secure-store'

export const hasToken = async () => {
  return await SecureStore.getItemAsync('token')
}
