import * as React from 'react'
import { PureComponent } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Icon, Text } from 'react-native-elements'
import { RouteComponentProps } from 'react-router-native'
import { NavigationScreenProps } from 'react-navigation'
import { connect } from 'react-redux'
import R from 'ramda'
import { BarGraph, Header } from '../../components'
import { Gear, Character, SavedGear } from '../../../types/common'

export interface Props extends NavigationScreenProps {
  characters: Character[],
  gears: Gear[],
  characterRoles: string[],
  savedGears: SavedGear[],
}

class Insights extends PureComponent<Props> {
  render = () => {
    const {
      navigation,
      characters,
      gears,
      characterRoles,
      savedGears,
    } = this.props
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Header
          leftComponent={(
            <TouchableOpacity
              onPress={() => {
                navigation.goBack()
              }}
            >
              <Icon
                name="arrow-back"
                color="white"
              />
            </TouchableOpacity>
          )}
        />
        <Text style={{ textAlign: 'center' }}>
          Character Roles VS owned gears
        </Text>
        <BarGraph
          characters={characters}
          gears={gears}
          characterRoles={characterRoles}
          savedGears={savedGears}
        />
      </View>
    )
  }
}

export default connect(R.identity)(Insights)
