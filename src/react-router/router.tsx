import * as React from 'react'
import { withRouter, Route, NativeRouter, Switch, BackButton } from 'react-router-native'
import { View, Text, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements'
import { GearList, Insights } from '../screens'
import { INSIGHTS, GEAR_LIST } from './routes'

const Router = () => (
  <NativeRouter>
    <BackButton>
      <View style={{ flex: 1 }}>
        <Switch>
          <Route
            exact path={GEAR_LIST}
            component={withRouter(GearList)}
          />
          <Route
            exact path={INSIGHTS}
            component={withRouter(Insights)}
          />
        </Switch>
      </View>
    </BackButton>
  </NativeRouter>
)

export default Router
