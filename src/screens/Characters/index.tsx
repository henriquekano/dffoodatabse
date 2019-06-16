import * as React from 'react'
import { PureComponent } from 'react'
import { connect } from 'react-redux'
import CharactersPresentational from '../../presentational/Characters'
import { tagCharacter, untagCharacter } from '../../redux/actions'
import { store } from '../../redux/store'
import StateProps from '../../redux/stateTypes'
import { Character } from '../../../types/common'

const R = require('ramda')

export interface CharactersScreenProps {
  characters: Character[],
  characterRoles: string[],
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
    } = this.props
    return (
      <CharactersPresentational
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
      characters: mergedCharacters,
      characterRoles: state.characterRoles,
    }
  }

  return {
    characters: state.characters,
    characterRoles: state.characterRoles,
  }
}

export default connect(
  R.pipe(
    mergeSavedCharacters,
  ),
)(Characters)
