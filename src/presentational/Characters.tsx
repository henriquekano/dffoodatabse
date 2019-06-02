import * as React from 'react'
import { PureComponent } from 'react'
import { View, FlatList, Animated } from 'react-native'
import { Text, FAB, Divider } from 'react-native-paper'
import FastImage from 'react-native-fast-image'
import { Chip, Header, TagModal } from '../components/index'
import { Character } from '../../types/common'
import { snakeCaseToSpacedCamelCase } from '../data-formatter/string'

const R = require('ramda')

const CharacterItem = ({ data }: { data: Character }) => (
  <View style={{ flexDirection: 'row' }}>
    <View style={{ flex: 1, width: null, height: null, minHeight: 60, maxWidth: '100%', maxHeight: '100%' }}>
      <FastImage
        style={{ flex: 1, width: null, maxHeight: 60, maxWidth: '100%', marginHorizontal: 20, marginVertical: 10 }}
        source={{
          uri: data.icon,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.contain}
      />
    </View>
    <View style={{ flex: 3 }}>
      <View style={{ flex: 1 }}>
        <Text>{ snakeCaseToSpacedCamelCase(data.slug) }</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
        {
          data.profile.traits.role.map((role: string) => (
            <Chip key={role}>
              { role }
            </Chip>
          ))
        }
      </View>
    </View>
  </View>
)

export interface CharactersPresentationalProps {
  characters: Character[],
  characterRoles: string[],
}

interface StateProps {
  modalOpen: boolean,
}

class CharactersPresentational extends PureComponent<CharactersPresentationalProps> {
  state: StateProps = {
    modalOpen: false,
  }

  formatCharactersToFlatList = (): [{ data: Character, key: string }] => {
    const { characters } = this.props
    const formatCharacterData = R.applySpec({
      data: R.identity,
      key: R.propOr(null, 'slug'),
    })
    return R.map(formatCharacterData, characters)
  }

  handleToggleModal = () => {
    this.setState((prevState: StateProps) => ({
      modalOpen: !prevState.modalOpen,
    }))
  }

  render = () => {
    const {
      characterRoles,
      characters,
    } = this.props
    const {
      modalOpen,
    } = this.state
    return (
      <View style={{ flex: 1 }}>
        <Header />
        <FlatList
          ItemSeparatorComponent={Divider}
          data={this.formatCharactersToFlatList()}
          renderItem={({ item: { data, key } }: { item: { data: Character, key: string } }) => (
            <CharacterItem data={data} key={key} />
          )}
        />
        <FAB
          style={{
            position: 'absolute',
            margin: 30,
            right: 0,
            bottom: 0,
          }}
          onPress={this.handleToggleModal}
          icon="label"
        />
        <TagModal
          characterRoles={characterRoles}
          selectedRoles={[]}
          characters={characters}
          selectedCharacters={[]}
          filterOpen={modalOpen}
          onApply={console.log}
          onClose={this.handleToggleModal}
          onPressRole={console.log}
          onPressCharacter={console.log}
        />
      </View>
    )
  }
}

export default CharactersPresentational
