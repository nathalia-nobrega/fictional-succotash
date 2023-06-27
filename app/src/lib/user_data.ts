import * as SecureStore from 'expo-secure-store'
import { api } from './api'

async function getUserData() {
  const secureToken = await SecureStore.getItemAsync('token')
  const user = await api.get('/api/users', {
    headers: {
      Authorization: `Bearer ${secureToken}`,
    },
  })
  return user.data
}

export const user_data = await getUserData()
