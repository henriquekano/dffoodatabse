import * as React from 'react'
import { PureComponent } from 'react'
import { connect } from 'react-redux'
import CharactersPresentational from '../../presentational/Characters'
import { Character } from '../../../types/common'

const R = require('ramda')

export interface CharactersScreenProps {
  characters: Character[],
  characterRoles: string[],
}

class Characters extends PureComponent<CharactersScreenProps> {
  render = () => {
    const {
      characterRoles,
      characters,
    } = this.props
    return (
      <CharactersPresentational
        characterRoles={characterRoles}
        characters={characters}
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
