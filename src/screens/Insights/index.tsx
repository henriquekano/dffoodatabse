import * as React from 'react'
import { PureComponent } from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-elements'
import { NavigationScreenProps } from 'react-navigation'
import { connect } from 'react-redux'
import R from 'ramda'
import StateProps from '../../redux/stateTypes'
import { BarGraph, Header } from '../../components'
import { INSIGHTS } from '../../react-navigation/routes'
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
        <Header title={INSIGHTS} onDrawerPress={() => navigation.openDrawer()}/>
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

const mergeSavedCharacters = (state: StateProps) => {
  const { characters, savedCharacters } = state
  if (characters) {
    const mergedCharacters = characters.map((character) => {
      const savedModifiers = savedCharacters[character.slug]
      if (savedModifiers) {
        return R.set(
          R.lensPath(['profile', 'traits', 'role']),
          savedModifiers.roles,
          character,
        )
      }

      return character
    })

    return {
      ...state,
      characters: mergedCharacters,
      characterRoles: state.characterRoles,
    }
  }

  return {
    ...state,
    characters: state.characters,
    characterRoles: state.characterRoles,
  }
}

export default connect(
  R.pipe(
    mergeSavedCharacters,
  )
)(Insights)
