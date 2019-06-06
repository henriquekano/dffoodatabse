import * as React from 'react'
import { PureComponent } from 'react'
import { Animated, PanResponder, ViewProps, View, LayoutChangeEvent, LayoutRectangle } from 'react-native'
import {
  dropChannel as defaultDropChannel,
  moveChannel as defaultMoveChannel,
  Message,
  Target,
} from '../contex'

export interface DraggableViewProps extends ViewProps {
  value?: any,
  dropChannel?: any,
  moveChannel?: any,
  targetName: Target,
}

class DraggableView extends PureComponent<DraggableViewProps> {
  state = {
    panValue: new Animated.ValueXY()
  }
  moveChannel?: any
  dropChannel?: any
  goBackAnimation?: Animated.CompositeAnimation = undefined
  panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (e, gestureState) => {
      if (this.initialPosition) {
        const { x, y } = this.initialPosition
        const { panValue } = this.state
        panValue.setValue({
          x: gestureState.dx,
          y: gestureState.dy,
        })
        this.moveChannel.next({
          gestureResponderEvent: e,
          gestureState,
          value: this.props.value,
          target: this.props.targetName,
          initialPosition: { x, y },
        })
      }
    },
    // Animated.event([
    //   null, { dx: this.state.panValue.x, dy: this.state.panValue.y }
    // ]),
    onPanResponderRelease: (e, gestureState) => {
      if (this.initialPosition) {
        const { x, y } = this.initialPosition
        if (this.goBackAnimation) {
          this.goBackAnimation.start()
          const message: Message = {
            gestureResponderEvent: e,
            gestureState,
            value: this.props.value,
            target: this.props.targetName,
          }
          this.dropChannel.next(message)
        }
      }
    },
  })

  initialPosition?: LayoutRectangle
  handleInitialLayout = (e: LayoutChangeEvent) => {
    this.initialPosition = e.nativeEvent.layout
  }

  constructor (props: DraggableViewProps) {
    super(props)
    const { moveChannel: propMoveChannel, dropChannel: propDropChannel } = props
    this.moveChannel = propMoveChannel || defaultMoveChannel
    this.dropChannel = propDropChannel || defaultDropChannel
    // this { 0, 0 } is relative to the initial position
    // not absolute!
    this.goBackAnimation = Animated.spring(
      this.state.panValue,
      {
        toValue: { x: 0, y: 0 },
        friction: 8,
      }
    )
    this.state.panValue.setValue({ x: 0, y: 0 })
  }

  render = () => {
    const {
      style,
    } = this.props
    const {
      panValue,
    } = this.state
    return (
      <Animated.View
        {...this.panResponder.panHandlers}
        {...this.props}
        onLayout={this.handleInitialLayout}
        style={[{
          transform: panValue.getTranslateTransform()
        }, style]}
      />
    )
  }
}

export default DraggableView
