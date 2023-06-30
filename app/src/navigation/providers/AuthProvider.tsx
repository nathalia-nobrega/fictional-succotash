import React, { PropsWithChildren, createContext, useState } from 'react'

export const AuthContext = createContext<{
  isUserAuthenticated: boolean
  login: () => void
  logout: () => void
}>({ isUserAuthenticated: false, login: () => {}, logout: () => {} })

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState<
    boolean | null
  >(null)
  return (
    <AuthContext.Provider
      value={{
        isUserAuthenticated,
        login: () => {
          setIsUserAuthenticated(true)
        },
        logout: () => {
          setIsUserAuthenticated(false)
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
