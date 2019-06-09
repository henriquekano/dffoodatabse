import * as React from 'react'
import { View, ScrollView, ViewStyle } from 'react-native'
import { Chip } from '../index'

export interface ScrollOfChipsProps {
  chips: string[],
  containerStyle?: ViewStyle,
}

const ScrollOfChips = ({
  chips, containerStyle
}: ScrollOfChipsProps) => {
  return (
    <View style={containerStyle}>
      <ScrollView horizontal>
        {
          chips.map(text => (
            <Chip key={text}>
              { text }
            </Chip>
          ))
        }
      </ScrollView>
    </View>
  )
}

export default ScrollOfChips
