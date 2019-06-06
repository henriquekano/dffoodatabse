import * as React from 'react'
import { PureComponent } from 'react'
import { View, FlatList, DrawerLayoutAndroid, Dimensions } from 'react-native'
import { Divider } from 'react-native-paper'
import { Chip, Header, DraggableView, DragLayout, DragFlatListTarget } from '../../components/index'
import { DraggableRenderItemInfo } from '../../components/Drag/DragFlatListTarget/index'
import { Character } from '../../../types/common'
import CharacterItem from './CharacterItem'

const R = require('ramda')

export interface CharactersPresentationalProps {
  characters: Character[],
  characterRoles: string[],
}

interface StateProps {
  drawerOpen: boolean,
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
    requestAnimationFrame(() => {
      this.setState((prevState: StateProps) => ({
        drawerOpen: !prevState.drawerOpen,
      }), () => {
        this.drawerRef.toggle()
      })
    })
  }

  render = () => {
    const {
      characterRoles,
      characters,
    } = this.props
    const {
      drawerOpen,
    } = this.state
    return (
      <View style={{ flex: 1 }}>
        <Header />
        <DragFlatListTarget
          keyExtractor={item => item.key}
          nameExtractor={item => item.key}
          ItemSeparatorComponent={Divider}
          onDrop={console.log}
          dragAreaWidthMultiplier={0.5}
          extraData={drawerOpen}
          data={this.formatCharactersToFlatList()}
          renderItem={(
            { item: { data, key }, index, separator, draggableHovering, draggableDropped }
            : DraggableRenderItemInfo
          ) => (
            <CharacterItem
              isUnderneathDrawer={!draggableHovering && drawerOpen}
              data={data}
              key={key}
            />
          )}
        />
        <DragLayout
          ref={(ref) => {
            this.drawerRef = ref
          }}
          onPressNub={this.handleToggleModal}
        >
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
                <DraggableView value={role} targetName="all" key={role}>
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
