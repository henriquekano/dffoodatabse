import * as React from 'react'
import { PureComponent } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import { RouteComponentProps } from 'react-router-native'
import { connect } from 'react-redux'
import R from 'ramda'
import { BarGraph, Header } from '../../components'
import StateProps from '../../redux/stateTypes'

export interface Props extends RouteComponentProps, StateProps {}

class Insights extends PureComponent<Props> {
  render = () => {
    const {
      history,
      match,
      characters,
      gears,
      characterRoles,
      savedGears,
    } = this.props
    return (
      <View style={{ flex: 1 }}>
        <Header
          leftComponent={(
            <TouchableOpacity
              onPress={() => {
                console.log(match)
                history.goBack()
              }}
            >
              <Icon
                name="arrow-back"
                color="white"
              />
            </TouchableOpacity>
          )}
        />
        <BarGraph
          characters={characters}
          gears={gears}
          roles={characterRoles}
          savedGears={savedGears}
        />
      </View>
    )
  }
}

export default connect(R.identity)(Insights)
