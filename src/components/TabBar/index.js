import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Icon, Text } from 'react-native-elements'
import PropTypes from 'prop-types'
import styles from './index.style'

const TabButton = ({
  text, icon, onPress, selected,
}) => (
  <TouchableOpacity
    style={[
      selected
        ? { backgroundColor: 'lightblue' }
        : null,
      styles.tab,
    ]}
    onPress={onPress}
  >
    <Icon
      name={icon}
      type="material"
      color="white"
    />
    <Text style={styles.text}>{ text }</Text>
  </TouchableOpacity>
)

const TabBar = ({
  viewMode,
  onPress,
}) => {
  return (
    <View style={styles.container}>
      <TabButton
        selected={viewMode === TabBar.viewMode.BY_CHARACTER}
        text="Characters"
        icon="face"
        onPress={() => onPress(TabBar.viewMode.BY_CHARACTER)}
      />
      <TabButton
        selected={viewMode === TabBar.viewMode.BY_ITSELF}
        text="Gears"
        icon="settings"
        onPress={() => onPress(TabBar.viewMode.BY_ITSELF)}
      />
    </View>
  )
}

TabBar.viewMode = {
  BY_CHARACTER: 'BY_CHARACTER',
  BY_ITSELF: 'BY_ITSELF',
}

TabBar.propTypes = {
  viewMode: PropTypes.oneOf(Object.values(TabBar.viewMode)).isRequired,
  onPress: PropTypes.func.isRequired,
}

export default TabBar
