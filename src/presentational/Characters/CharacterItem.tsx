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
  onLongPress: (role: string, character: Character) => void,
}

class CharacterItem extends PureComponent<CharacterItemProps> {
  handleDraggableEnteredArea = () => {
  }

  handleDraggableLeftArea = () => {
  }

  render = () => {
    const { data, isUnderneathDrawer, onLongPress } = this.props
    return  (
      <Veil conceal={isUnderneathDrawer}>
        <View
          style={{ flexDirection: 'row' }}
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
                  <Chip
                    onLongPress={() => onLongPress(role, data)}
                    key={role}
                  >
                    { role }
                  </Chip>
                ))
              }
            </View>
          </View>
        </View>
      </Veil>
    )
  }
}

export default CharacterItem
