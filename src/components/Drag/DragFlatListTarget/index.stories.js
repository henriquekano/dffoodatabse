/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { View } from 'react-native'
import { storiesOf } from '@storybook/react-native'
import R from 'ramda'
import DragFlatListTarget from '.'

const mockData = R.times(R.identity, 20)

storiesOf('DragFlatListTarget', module)
  .add('default', () => (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: 'yellow', height: 40 }}/>
      <DragFlatListTarget
        style={{ flex: 1 }}
        data={mockData}
        initialNumToRender={6}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={({ item, index }) => (
          <View
            style={{
              height: 100,
              padding: 1,
              margin: 10,
              backgroundColor: index % 2 === 0 ? 'red' : 'blue',
            }}
          />
        )}
      />
    </View>
  ))
