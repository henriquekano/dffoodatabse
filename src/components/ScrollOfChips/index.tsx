import * as React from 'react'
import { View, ScrollView, StyleProp, ViewStyle } from 'react-native'
import { Chip, DraggableView } from '../index'

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
            <DraggableView
              targetName="all"
              style={{ zIndex: 1, position: 'absolute' }}
            >
              <Chip key={text}>
                { text }
              </Chip>
            </DraggableView>
          ))
        }
      </ScrollView>
    </View>
  )
}

export default ScrollOfChips
