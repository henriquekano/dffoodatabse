import * as React from 'react'
import { PureComponent } from 'react'
import { Animated, PanResponder, PanResponderInstance, ViewProps, View, } from 'react-native'
import { dropChannel, moveChannel, Message, Target } from '../contex'

export interface DraggableViewProps extends ViewProps {
  value?: any,
  subject?: any,
  targetName: Target,
}

class DraggableView extends PureComponent<DraggableViewProps> {
  state = {
    panValue: new Animated.ValueXY()
  }
  goBackAnimation?: Animated.CompositeAnimation = undefined
  panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (e, gestureState) => {
      const { panValue } = this.state
      panValue.setValue({
        x: gestureState.dx,
        y: gestureState.dy,
      })
      moveChannel.next({
        gestureResponderEvent: e,
        gestureState,
        value: this.props.value,
        target: this.props.targetName,
      })
    },
    // Animated.event([
    //   null, { dx: this.state.panValue.x, dy: this.state.panValue.y }
    // ]),
    onPanResponderRelease: (e, gestureState) => {
      if (this.goBackAnimation) {
        this.goBackAnimation.start()
        const message: Message = {
          gestureResponderEvent: e,
          gestureState,
          value: this.props.value,
          target: this.props.targetName,
        }
        dropChannel.next(message)
      }
    },
  })

  constructor (props: DraggableViewProps) {
    super(props)
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
        style={[{
          transform: panValue.getTranslateTransform()
        }, style]}
      />
    )
  }
}

export default DraggableView
