import * as React from 'react'
import { PureComponent } from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'
import FastImage from 'react-native-fast-image'
import { Chip, Veil, DragTarget } from '../../components/index'
import { Character } from '../../../types/common'
import { snakeCaseToSpacedCamelCase } from '../../data-formatter/string'

export interface CharacterItemProps {
  data: Character,
  isUnderneathDrawer: boolean,
}

class CharacterItem extends PureComponent<CharacterItemProps> {
  state = {
    draggableIsBeingHoldAbove: false,
  }

  handleDraggableEnteredArea = () => {
    const { data, isUnderneathDrawer } = this.props
    console.log('handleDraggableEnteredArea', data.slug)
    this.setState({
      draggableIsBeingHoldAbove: true,
    })
  }

  handleDraggableLeftArea = () => {
    const { data, isUnderneathDrawer } = this.props
    console.log('handleDraggableLeftArea', data.slug)
    this.setState({
      draggableIsBeingHoldAbove: false,
    })
  }

  render = () => {
    const { data, isUnderneathDrawer } = this.props
    const { draggableIsBeingHoldAbove } = this.state
    return  (
      <Veil conceal={isUnderneathDrawer || draggableIsBeingHoldAbove}>
        <DragTarget
          name={data.slug}
          onEnterArea={this.handleDraggableEnteredArea}
          onLeaveArea={this.handleDraggableLeftArea}
          onDrop={console.log}
          style={{ flexDirection: 'row' }}
          // this value is related to the draglayout width
          areaWidthMultiplier={0.5}
        >
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
        </DragTarget>
      </Veil>
    )
  }
}

export default CharacterItem
