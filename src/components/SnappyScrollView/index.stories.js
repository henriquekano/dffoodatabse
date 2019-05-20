import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { Text, View } from 'react-native'
import R from 'ramda'
import SnappyView from '.'

const exampleData = R.addIndex(
  R.map,
)(
  (value, index) => ({
    text: `eita ${index}`,
  }),
  Array(100),
)

const itemRender = data => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>
      { data.text }
    </Text>
  </View>
)

storiesOf('SnappyView', module)
  .add('default', () => (
    <SnappyView
      data={exampleData}
      itemsPerPage={2}
      renderItem={itemRender}
    />
  ))
