import * as React from 'react'
import { PureComponent } from 'react'
import { connect } from 'react-redux'
import CharactersPresentational from '../../presentational/Characters'
import { tagCharacter, untagCharacter } from '../../redux/actions'
import { store } from '../../redux/store'
import StateProps from '../../redux/stateTypes'
import { Character, NaturalPassiveAbility } from '../../../types/common'

const R = require('ramda')

export interface CharactersScreenProps {
  characters: Character[],
  characterRoles: string[],
  naturalPassiveAbilities: NaturalPassiveAbility[],
  navigation: any,
}

class Characters extends PureComponent<CharactersScreenProps> {
  tagCharacter = (role: string, character: Character) => {
    store.dispatch(tagCharacter(role, character))
  }

  untagCharacter = (role: string, character: Character) => {
    store.dispatch(untagCharacter(role, character))
  }

  render = () => {
    const {
      characterRoles,
      characters,
      navigation,
      naturalPassiveAbilities,
    } = this.props
    return (
      <CharactersPresentational
        naturalPassiveAbilities={naturalPassiveAbilities}
        characterRoles={characterRoles}
        characters={characters}
        onTag={this.tagCharacter}
        onSelectCharacterRole={this.untagCharacter}
        onDrawerPress={() => navigation.openDrawer()}
      />
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
    }
  }

  return {
    ...state,
    characters: state.characters,
  }
}

export default connect(
  R.pipe(
    mergeSavedCharacters,
    R.pick([
      'characterRoles',
      'characters',
      'naturalPassiveAbilities',
    ])
  ),
)(Characters)
