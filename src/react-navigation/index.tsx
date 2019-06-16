import * as React from "react"
import { View, Text } from "react-native"
import {
  createAppContainer,
  createDrawerNavigator,
  NavigationState,
  NavigationRoute,
} from "react-navigation"
import Analytics from 'appcenter-analytics'
import { GearList, Insights, Characters } from '../screens'
import { CHARACTERS, GEAR_LIST, INSIGHTS } from './routes'

const AppNavigator = createDrawerNavigator(
  {
    [GEAR_LIST]: {
      path: GEAR_LIST,
      screen: GearList,
    },
    [INSIGHTS]: {
      path: INSIGHTS,
      screen: Insights,
    },
    [CHARACTERS]: {
      path: CHARACTERS,
      screen: Characters,
    },
  }, {
    initialRouteName: GEAR_LIST,
  }
)

const AppContainer = createAppContainer(AppNavigator)

type NavigationStateOrRoute = NavigationState | NavigationRoute
// gets the current screen from navigation state
const getActiveRouteName = (navigationState: NavigationStateOrRoute): string => {
  const route = navigationState.routes[navigationState.index]
  // dive into nested navigators
  if (route.routes) {
    return getActiveRouteName(route)
  }
  return route.routeName
}
export default () => (
  <AppContainer
    onNavigationStateChange={(prevState, currentState, action) => {
      const currentScreen = getActiveRouteName(currentState)
      const prevScreen = getActiveRouteName(prevState)
      if (prevScreen !== currentScreen) {
        Analytics.trackEvent('NAVIGATION', { currentScreen })
      }
    }}
  />
)
