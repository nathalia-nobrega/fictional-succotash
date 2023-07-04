import React, {
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from 'react'
import { api } from '../../lib/api'
import { getUserToken } from '../../lib/auth/AuthTokenProvider'

/* The reason why this context exists is I needed to access the same data from different components that needed a "middle man" in order to receive it. So I figured using a context would make my life easier */

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
