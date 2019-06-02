/* eslint-disable import/no-extraneous-dependencies */
import React, { PureComponent } from 'react'
import { View, Alert, Text, TouchableOpacity } from 'react-native'
import { storiesOf } from '@storybook/react-native'
import DraggableView from './DraggableView'
import DragTarget from './DragTarget'
import DragLayout from './DragLayout'

class ShowMoveArea extends PureComponent {
  state = {
    insideTarget: false,
    droppedInside: false,
  }
  render = () => {
    const { insideTarget, droppedInside } = this.state
    return (
      <View style={{ flex: 1 }}>
        <DraggableView
          style={{ height: 40, width: 40, backgroundColor: 'red' }}
          targetName="yellow_box"
          value="42"
        />
        <DragTarget
          style={{ height: 100, width: 200, backgroundColor: 'yellow' }}
          name="yellow_box"
          onEnterArea={() => this.setState({
            insideTarget: true,
          })}
          onLeaveArea={() => this.setState({
            insideTarget: false,
          })}
          onDrop={() => this.setState({
            droppedInside: true,
          })}
        />
        <Text>
          is inside? { insideTarget ? 'true' : 'false' }
        </Text>
        <Text>
          dropped inside? { droppedInside ? 'true' : 'false' }
        </Text>
      </View>
    )
  }
}

storiesOf('DragArea', module)
  .add('default', () => (
    <View style={{ flex: 1 }}>
      <DraggableView
        style={{ height: 40, width: 40, backgroundColor: 'red' }}
        targetName="yellow_box"
        value="42"
      />
      <DragTarget
        style={{ height: 100, width: 200, backgroundColor: 'yellow' }}
        name="yellow_box"
        onDrop={(e, gestureState, value) => Alert.alert('drop!', value)}
      />
    </View>
  ))
  .add('multiple targets and draggables', () => (
    <View style={{ flex: 1 }}>
      <DraggableView
        style={{ height: 40, width: 40, backgroundColor: 'red' }}
        targetName="yellow_box"
        value="42"
      />
      <DragTarget
        style={{ height: 100, width: 200, backgroundColor: 'yellow' }}
        name="yellow_box"
        onDrop={(e, gestureState, value) => Alert.alert('drop!', value)}
      />
      <DraggableView
        style={{ height: 40, width: 40, backgroundColor: 'red' }}
        targetName="green_box"
        value="41"
      />
      <DragTarget
        style={{ height: 100, width: 200, backgroundColor: 'green' }}
        name="green_box"
        onDrop={(e, gestureState, value) => Alert.alert('drop!', value)}
      />
      <DraggableView
        style={{ height: 40, width: 40, backgroundColor: 'red' }}
        targetName="orange_box"
        value="40"
      />
      <DragTarget
        style={{ height: 100, width: 200, backgroundColor: 'orange' }}
        name="orange_box"
        onDrop={(e, gestureState, value) => Alert.alert('drop!', value)}
      />
    </View>
  ))
  .add('multiple targets, one draggable', () => (
    <View style={{ flex: 1 }}>
      <DraggableView
        style={{ height: 40, width: 40, backgroundColor: 'red' }}
        targetName="all"
        value="100"
      />
      <DragTarget
        style={{ height: 100, width: 200, backgroundColor: 'yellow' }}
        name="yellow_box"
        onDrop={(e, gestureState, value) => Alert.alert('drop!', 'yellow_box')}
      />
      <DragTarget
        style={{ height: 100, width: 200, backgroundColor: 'green' }}
        name="green_box"
        onDrop={(e, gestureState, value) => Alert.alert('drop!', 'green_box')}
      />
      <DragTarget
        style={{ height: 100, width: 200, backgroundColor: 'orange' }}
        name="orange_box"
        onDrop={(e, gestureState, value) => Alert.alert('drop!', 'orange_box')}
      />
    </View>
  ))
  .add('multiple draggables, one targe', () => (
    <View style={{ flex: 1 }}>
      <DraggableView
        style={{ height: 40, width: 40, backgroundColor: 'red' }}
        targetName="orange_box"
        value="42"
      />
      <DraggableView
        style={{ height: 40, width: 40, backgroundColor: 'blue' }}
        targetName="orange_box"
        value="41"
      />
      <DraggableView
        style={{ height: 40, width: 40, backgroundColor: 'beige' }}
        targetName="orange_box"
        value="40"
      />
      <DragTarget
        style={{ height: 100, width: 200, backgroundColor: 'orange' }}
        name="orange_box"
        onDrop={(e, gestureState, value) => Alert.alert('drop!', value)}
      />
    </View>
  ))
  .add('move callback', () => (
    <ShowMoveArea />
  ))

class ControlledDragLayout extends PureComponent {
  layoutRef = React.createRef()

  render = () => (
    <View style={{ flex: 1 }}>
      <TouchableOpacity onPress={() => this.layoutRef.open()}>
        <Text> Open </Text>
      </TouchableOpacity>
      <DragLayout
        ref={(ref) => {
          this.layoutRef = ref
        }}
      >
        <View style={{ flex: 1, backgroundColor: 'red' }}>
          <TouchableOpacity onPress={() => this.layoutRef.close()}>
            <Text> Close </Text>
          </TouchableOpacity>
        </View>
      </DragLayout>
    </View>
  )
}

storiesOf('DragLayout', module)
  .add('default', () => (
    <ControlledDragLayout />
  ))
