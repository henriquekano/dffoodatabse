import * as React from 'react'
import { View, ActivityIndicator } from 'react-native'
import { Text } from 'react-native-elements'

const CacheRetrieve = (): React.ReactNode => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <ActivityIndicator size="large" />
    <Text>Retrieving cache</Text>
  </View>
)

export default CacheRetrieve
