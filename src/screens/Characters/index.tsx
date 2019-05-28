import * as React from 'react'
import { PureComponent } from 'react'
import { View, FlatList, Dimensions, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { Text, Divider, FAB } from 'react-native-paper'
import FastImage from 'react-native-fast-image'
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview'
import {
  Header,
  Chip,
} from '../../components'
import { Character } from '../../../types/common'
import { snakeCaseToSpacedCamelCase } from '../../data-formatter/string'

const R = require('ramda')

export interface CharactersScreenProps {
  characters: Character[],
}

const ViewTypes = {
  FULL: 0,
  HALF_LEFT: 1,
  HALF_RIGHT: 2
}

const screenWidth = Dimensions.get('window').width

const CharacterItem = ({ data }) => (
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

class Characters extends PureComponent<CharactersScreenProps> {
  formatCharactersToFlatList = (): [{ data: Character, key: string }] => {
    const { characters } = this.props
    const formatCharacterData = R.applySpec({
      data: R.identity,
      key: R.propOr(null, 'slug'),
    })
    return R.map(formatCharacterData, characters)
  }

  render = () => {
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
            margin: 20,
            right: 0,
            bottom: 0,
          }}
          icon="add"
        />
      </View>
    )
  }
}

export default connect(
  R.applySpec({
    characters: R.propOr([], 'characters'),
  }),
)(Characters)
