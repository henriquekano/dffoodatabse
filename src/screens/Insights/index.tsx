import * as React from 'react'
import { PureComponent } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import { RouteComponentProps } from 'react-router-native'
import { BarGraph, Header } from '../../components'
import { Character, Gear, SavedGear } from '../../../types/common'

export interface Props extends RouteComponentProps {
  characters: Character[],
  gears: Gear[],
  roles: string[],
  savedGears: SavedGear[],
}

export default class Insights extends PureComponent<Props> {
  render = () => {
    const {
      history,
      match,
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
          characters={[]}
          gears={[]}
          roles={[]}
          savedGears={[]}
        />
      </View>
    )
  }
}
