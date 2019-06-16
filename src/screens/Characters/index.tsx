import * as React from 'react'
import { PureComponent } from 'react'
import { connect } from 'react-redux'
import CharactersPresentational from '../../presentational/Characters'
import { tagCharacter, untagCharacter } from '../../redux/actions'
import { store } from '../../redux/store'
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

export default connect(
  R.applySpec({
    characters: R.propOr([], 'characters'),
    characterRoles: R.propOr([], 'characterRoles'),
  }),
)(Characters)
