import * as React from "react"
import { View, Text } from "react-native"
import { createStackNavigator, createAppContainer } from "react-navigation"
import { GearList, Insights, Characters } from '../screens'
import { CHARACTERS, GEAR_LIST, INSIGHTS } from './routes'

const AppNavigator = createStackNavigator(
  {
    [GEAR_LIST]: GearList,
    [INSIGHTS]: Insights,
    [CHARACTERS]: Characters,
  }, {
    initialRouteName: GEAR_LIST,
    headerMode: 'none',
  }
)

export default createAppContainer(AppNavigator)
