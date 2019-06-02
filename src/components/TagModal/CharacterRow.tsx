import * as React from 'react'
import { View } from 'react-native'
import { Card, Text } from 'react-native-paper'
import FastImage from 'react-native-fast-image'
import { snakeCaseToSpacedCamelCase } from '../../data-formatter/string'
import { Character } from '../../../types/common'

const R = require('ramda')

const characterIsSelected = (character: Character, listOfCharacters: Character[]) => {
  return R.any(
    R.eqBy(
      R.propOr('', 'slug'),
      character.slug,
    )
  )(listOfCharacters)
}

export interface CharacterRowProps {
  item: Character[],
  selectedCharacters: Character[],
  onPressCharacter: (character: Character) => void,
}

const CharacterRow = ({ item, selectedCharacters, onPressCharacter }: CharacterRowProps) => {
  const unselectedCardStyle = { minHeight: 60, justifyContent: 'center', paddingVertical: 5 }
  const selectedCardStyle =  { minHeight: 60, justifyContent: 'center', paddingVertical: 5, backgroundColor: '#3D6DCC' }
  const selectedTextStyle = { color: 'white' }
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      {
        item.map((character: Character) => {
          const thisCharacterIsSelected = characterIsSelected(character, selectedCharacters)
          const cardStyle = thisCharacterIsSelected
            ? selectedCardStyle
            : unselectedCardStyle
          const textStyle = thisCharacterIsSelected
            ? selectedTextStyle
            : null
          return (
            <View style={{ width: '33%', padding: 10 }} key={character.slug}>
              <Card
                onPress={() => onPressCharacter(character)}
                style={cardStyle}
              >
                <FastImage
                  style={{ flex: 1, width: null, height: null, maxWidth: '100%', maxHeight: '100%' }}
                  source={{
                    uri: character.icon,
                    priority: FastImage.priority.normal,
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                />
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={[
                    { textAlign: 'center' },
                    textStyle,
                  ]}
                >
                  { snakeCaseToSpacedCamelCase(character.slug) }
                </Text>
              </Card>
            </View>
          )
        })
      }
    </View>
  )
}

export default CharacterRow
