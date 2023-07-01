import React, { useEffect, useState } from 'react'
import { HomeController } from '../../../app/HomeController'
import { getUserData } from '../../lib/user/UserDataProvider'
import { TypeUserProfile } from '../../lib/user/UserProfileType'
import { StackNavigationProps } from '../RootNavigator'
import { RootStackParamList } from '../MainNavigator'

export const HomePage: React.FC<
  StackNavigationProps<RootStackParamList, 'Home'>
> = ({ navigation, route }) => {
  const [userData, setUserData] = useState<TypeUserProfile>()
  useEffect(() => {
    const userDataParams = async () => {
      const data = await getUserData()
      setUserData(data)
    }
    userDataParams()
  }, [])
  return <HomeController user_data={userData} />
}
