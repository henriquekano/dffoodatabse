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
import DragContext, { Message, Target } from '../contex'

export interface DragTargetProps extends ViewProps {
  onDrop: (e: GestureResponderEvent, gestureState: PanResponderGestureState, value: any) => void,
  name: string,
}

class DragTarget extends PureComponent<DragTargetProps> {
  layout?: LayoutRectangle
  panSubscription?: any

  componentDidMount = () => {
    const { onDrop } = this.props
    this.panSubscription = DragContext.subscribe(
      ({ gestureResponderEvent, gestureState, value, target }: Message) => {
        const { moveX, moveY } = gestureState
        const IamTheTarget = target === 'all' || target === this.props.name
        if (IamTheTarget && this.isWithinLayoutRectangle(moveX, moveY)) {
          onDrop(gestureResponderEvent, gestureState, value)
        }
      }
    )
  }

  componentWillUnmount = () => {
    if (this.panSubscription) {
      this.panSubscription.unsubscribe()
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
