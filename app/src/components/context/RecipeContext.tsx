import React, {
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from 'react'
import { api } from '../../lib/api'
import { getUserToken } from '../../lib/auth/AuthTokenProvider'

// TODO: Update this to handle recipe updates and deletion

export type RecipeDTO = {
  id: number
  name: string
  timeToCook: string
  data: any
}

type RecipiesContextType = {
  recipies: RecipeDTO[]
  setRecipies: React.Dispatch<React.SetStateAction<RecipeDTO[]>>
}

export const RecipiesContext = createContext<RecipiesContextType>(
  null as unknown as RecipiesContextType,
)

// Using this mainly because I try to reduce the amount of times I make a request for a recipe
export const RecipiesProvider = ({ children }: PropsWithChildren) => {
  const [recipies, setRecipies] = useState<RecipeDTO[]>([])
  async function loadRecipies() {
    const token = await getUserToken()
    const recipiesResponse = await api.get('/api/recipies/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    setRecipies(recipiesResponse.data)
  }

  useEffect(() => {
    loadRecipies()
  }, [])
  return (
    <RecipiesContext.Provider value={{ recipies, setRecipies }}>
      {children}
    </RecipiesContext.Provider>
  )
}
