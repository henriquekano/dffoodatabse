import * as React from 'react'
import { TouchableOpacity, ViewStyle, TextStyle } from 'react-native'
import { Text } from 'react-native-paper'

export interface ChipProps {
  style: ViewStyle,
  textStyle: TextStyle,
  onPress: () => void,
  children: React.ReactNode,
}

const Chip = ({
  style, onPress, children, textStyle,
}: ChipProps) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      style,
      { paddingHorizontal: 6, paddingVertical: 4, margin: 5, borderWidth: 1, borderColor: 'grey', borderRadius: 20 }
    ]}
  >
    <Text style={textStyle} >
      { children }
    </Text>
  </TouchableOpacity>
)

export default Chip
