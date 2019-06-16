import * as React from "react"
import { View, Text } from "react-native"
import { createStackNavigator, createAppContainer, createDrawerNavigator } from "react-navigation"
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

export default createAppContainer(AppNavigator)
