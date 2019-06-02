import * as React from 'react'
import { TouchableOpacity, ViewStyle, TextStyle } from 'react-native'
import { Text } from 'react-native-paper'

export interface ChipProps {
  onPress: () => void,
  children: string,
  selected?: boolean,
}

const selectedChipStyle = {
  backgroundColor: '#3D6DCC',
}

const selectedTextStyle = {
  color: 'white',
}

const Chip = ({
  onPress, children, selected,
}: ChipProps) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      { paddingHorizontal: 6, paddingVertical: 4, margin: 5, borderWidth: 1, borderColor: 'grey', borderRadius: 20 },
      selected ? selectedChipStyle : null
    ]}
  >
    <Text style={selected ? selectedTextStyle : null} >
      { children }
    </Text>
  </TouchableOpacity>
)

export default Chip
