import { api } from '../api'
import { getUserToken } from '../auth/AuthTokenProvider'

export async function getUserData() {
  const secureToken = await getUserToken()
  const user = await api.get('/api/users', {
    headers: {
      Authorization: `Bearer ${secureToken}`,
    },
  })
  return user.data
}
