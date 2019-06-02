import * as React from 'react'
import { PureComponent } from 'react'
import { View, FlatList, Animated, DrawerLayoutAndroid, Dimensions } from 'react-native'
import { Text, FAB, Divider } from 'react-native-paper'
import FastImage from 'react-native-fast-image'
import { Chip, Header, DraggableView, DragLayout } from '../components/index'
import { Character } from '../../types/common'
import { snakeCaseToSpacedCamelCase } from '../data-formatter/string'

const R = require('ramda')

const { width: screenWidth } = Dimensions.get('window')

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
  drawerRef?: DrawerLayoutAndroid = React.createRef()
  state = {
    drawerOpen: false,
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
    const { drawerOpen } = this.state
    if (this.drawerRef) {
      if (drawerOpen) {
        this.setState({
          drawerOpen: false,
        }, () => {
          this.drawerRef.closeDrawer()
        })
      } else {
        this.setState({
          drawerOpen: true,
        }, () => {
          this.drawerRef.openDrawer()
        })
      }
    }
  }

  render = () => {
    const {
      characterRoles,
      characters,
    } = this.props
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
          <DragLayout>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                flexWrap: 'wrap',
              }}
            >
              {
                characterRoles.map((role: string) => (
                  <DraggableView key={role}>
                    <Chip style={{ backgroundColor: 'white' }}>
                      { role }
                    </Chip>
                  </DraggableView>
                ))
              }
            </View>
          </DragLayout>

      </View>
    )
  }
}

export default CharactersPresentational
