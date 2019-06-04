/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { View, Text } from 'react-native'
import { storiesOf } from '@storybook/react-native'
import R from 'ramda'
import DragFlatListTarget from '.'
import DraggableView from '../DraggableView/index'

const mockData = R.times(R.identity, 20)

storiesOf('DragFlatListTarget', module)
  .add('default', () => (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: 'yellow', height: 40 }} />
      <DragFlatListTarget
        style={{ flex: 1 }}
        data={mockData}
        initialNumToRender={6}
        keyExtractor={(item, index) => `${item}-${index}`}
        nameExtractor={(item, index) => item}
        renderItem={({ item, index, separators, draggableDropped, draggableHovering }) => {
          console.log(item, index, draggableDropped, draggableHovering)
          return (
            <View
              style={{
                height: 100,
                padding: 1,
                margin: 10,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: index % 2 === 0 ? 'red' : 'blue',
              }}
            >
              <Text style={{ color: 'white' }}>
                { item }
              </Text>
              <Text style={{ color: 'white' }}>
                { draggableDropped ? 'DROPPED HERE!' : null }
              </Text>
              <Text style={{ color: 'white' }}>
                { draggableHovering ? 'HOVERING HERE!' : null }
              </Text>
            </View>
          )
        }}
      />
      <DraggableView
        style={{ height: 40, width: 40, backgroundColor: 'green', position: 'absolute', top: 0, left: 0 }}
        targetName="all"
      >
        <Text> Drag Me! </Text>
      </DraggableView>
    </View>
  ))
