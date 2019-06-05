/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { View, Text, Alert } from 'react-native'
import { storiesOf } from '@storybook/react-native'
import R from 'ramda'
import DragFlatListTarget from '.'
import DraggableView from '../DraggableView/index'
import { Veil } from '../../index'

const mockData = R.times(R.identity, 20)

storiesOf('DragFlatListTarget', module)
  .add('default', () => (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: 'yellow', height: 100 }} />
      <DragFlatListTarget
        style={{ flex: 1 }}
        data={mockData}
        initialNumToRender={6}
        keyExtractor={(item, index) => `${item}-${index}`}
        nameExtractor={(item, index) => item}
        onDrop={(e, gestureState, value) => Alert.alert('Drop Value', value)}
        renderItem={({ item, index, separators, draggableDropped, draggableHovering }) => {
          return (
            <Veil
              conceal={!draggableHovering}
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
            </Veil>
          )
        }}
      />
      <DraggableView
        value="SUPER_DUPER_VALUE!"
        style={{ height: 40, width: 40, backgroundColor: 'green', position: 'absolute', top: 0, left: 0 }}
        targetName="all"
      >
        <Text> Drag Me! </Text>
      </DraggableView>
    </View>
  ))
