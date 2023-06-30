import {
  NavigationContainerRef,
  ParamListBase,
  RouteProp,
  StackActions,
} from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import * as React from 'react'
import { RootStackParamList } from './MainNavigator'

// This allow to get route and navigation props

export interface StackNavigationProps<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList = string,
> {
  navigation: NativeStackNavigationProp<ParamList, RouteName>
  route: RouteProp<ParamList, RouteName>
}

// This allow to call navigation from outside a Navigator. Usefull for floating RoomController

export const navigationRef =
  React.createRef<NavigationContainerRef<RootStackParamList>>()

export function navigate(name, params = {}) {
  navigationRef.current?.dispatch(StackActions.popToTop())
  navigationRef.current?.navigate(name, params)
}
