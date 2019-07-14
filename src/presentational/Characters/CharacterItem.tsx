import * as React from 'react'
import { PureComponent } from 'react'
import { View, TouchableNativeFeedback } from 'react-native'
import { Text, Surface } from 'react-native-paper'
import FastImage from 'react-native-fast-image'
import { Chip, Veil, DragTarget } from '../../components/index'
import { Character } from '../../../types/common'
import { snakeCaseToSpacedCamelCase } from '../../data-formatter/string'

export interface CharacterItemProps {
  data: Character,
  isUnderneathDrawer: boolean,
  onLongPress: (role: string, character: Character) => void,
  onPress: (character: Character) => void,
}

class CharacterItem extends PureComponent<CharacterItemProps> {
  render = () => {
    const { data, isUnderneathDrawer, onLongPress, onPress } = this.props
    return  (
      <Veil conceal={isUnderneathDrawer} style={{ elevation: 5 }}>
        <Surface
          style={{
            elevation: 4,
            marginVertical: 4,
            marginHorizontal: 8,
            paddingVertical: 8,
            zIndex: 0,
          }}
        >
          <TouchableNativeFeedback onPress={() => onPress(data)}>
            <View>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
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
                <View style={{ flex: 2 }}>
                  <Text style={{ fontWeight: 'bold' }}>
                    { snakeCaseToSpacedCamelCase(data.slug) }
                  </Text>
                </View>
              </View>
              <View style={{ flex: 3 }}>
                <View style={{ paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
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
          </TouchableNativeFeedback>
        </Surface>
      </Veil>
    )
  }
}

export default CharacterItem
