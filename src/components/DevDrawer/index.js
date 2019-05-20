import React, { PureComponent } from 'react'
import { View, DrawerLayoutAndroid, NativeModules } from 'react-native'
import { Button } from 'react-native-elements'
import AsyncStorage from '@react-native-community/async-storage'

const { DevMenu } = NativeModules

class DevDrawer extends PureComponent {
  renderDrawerContent = () => (
    <View style={{ flex: 1, backgroundColor: '#fff', padding: 5 }}>
      <Button
        title="DevMenu"
        onPress={() => DevMenu.show()}
      />
      <Button
        title="AsyncStorageClean"
        onPress={async () => AsyncStorage.clear()}
      />
    </View>
  )

  render = () => {
    const { children } = this.props
    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={this.renderDrawerContent}
      >
        { children }
      </DrawerLayoutAndroid>
    )
  }
}

export default DevDrawer
