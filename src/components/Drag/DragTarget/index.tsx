import * as React from 'react'
import { PureComponent } from 'react'
import {
  View,
  ViewProps,
  LayoutChangeEvent,
  LayoutRectangle,
  PanResponderGestureState,
  GestureResponderEvent,
} from 'react-native'
import { dropChannel, moveChannel, Message, Target } from '../contex'

export interface DragTargetProps extends ViewProps {
  onDrop?: (e: GestureResponderEvent, gestureState: PanResponderGestureState, value: any) => void,
  onEnterArea?: (e: GestureResponderEvent, gestureState: PanResponderGestureState, value: any) => void,
  onLeaveArea?: (e: GestureResponderEvent, gestureState: PanResponderGestureState, value: any) => void,
  name: string,
}

class DragTarget extends PureComponent<DragTargetProps> {
  layout?: LayoutRectangle
  dropSubscription?: any
  moveSubscription?: any
  isInsideArea = false

  componentDidMount = () => {
    const { onDrop, onEnterArea, onLeaveArea } = this.props
    this.dropSubscription = onDrop
      ? dropChannel.subscribe(
        ({ gestureResponderEvent, gestureState, value, target }: Message) => {
          const { moveX, moveY } = gestureState
          const IamTheTarget = target === 'all' || target === this.props.name
          if (IamTheTarget && this.isWithinLayoutRectangle(moveX, moveY)) {
            onDrop(gestureResponderEvent, gestureState, value)
          }
        }
      )
      : null
    this.moveSubscription = onEnterArea || onLeaveArea
      ? moveChannel.subscribe(
        ({ gestureResponderEvent, gestureState, value, target }: Message) => {
          const { moveX, moveY } = gestureState
          const IamTheTarget = target === 'all' || target === this.props.name
          if (IamTheTarget) {
            const enteredArea = this.isWithinLayoutRectangle(moveX, moveY) && !this.isInsideArea
            const leftArea = !this.isWithinLayoutRectangle(moveX, moveY) && this.isInsideArea
            if (enteredArea) {
              onEnterArea && onEnterArea(gestureResponderEvent, gestureState, value)
              this.isInsideArea = true
            } else if (leftArea) {
              onLeaveArea && onLeaveArea(gestureResponderEvent, gestureState, value)
              this.isInsideArea = false
            }
          }
        }
      )
      : null
  }

  componentWillUnmount = () => {
    if (this.dropSubscription) {
      this.dropSubscription.unsubscribe()
    }
    if (this.moveSubscription) {
      this.moveSubscription.unsubscribe()
    }
  }

  isWithinLayoutRectangle = (x: number, y: number) => {
    if (!this.layout) {
      return false
    }

    const isWithinXRange = x > this.layout.x && x < this.layout.x + this.layout.width
    const isWithinYRange = y > this.layout.y && y < this.layout.y + this.layout.height
    return isWithinXRange && isWithinYRange
  }

  trackViewPositionAndSize = (e: LayoutChangeEvent) => {
    const { onLayout } = this.props

    this.layout = e.nativeEvent.layout

    onLayout && onLayout(e)
  }

  render = () => {
    return (
      <View
        {...this.props}
        onLayout={this.trackViewPositionAndSize}
      />
    )
  }
}

export default DragTarget
