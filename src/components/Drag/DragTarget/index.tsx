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
import { dropChannel as defaultDropChannel, moveChannel as defaultMoveChannel, Message, Target } from '../contex'

export interface DragTargetProps extends ViewProps {
  onDrop?: (e: GestureResponderEvent, gestureState: PanResponderGestureState, value: any) => void,
  onEnterArea?: (e: GestureResponderEvent, gestureState: PanResponderGestureState, value: any) => void,
  onLeaveArea?: (e: GestureResponderEvent, gestureState: PanResponderGestureState, value: any) => void,
  name: string,
  areaXOffset?: number,
  areaYOffset?: number,
  areaWidthMultiplier?: number,
  areaHeightMultiplier?: number,
  moveChannel?: any,
  dropChannel?: any,
}

class DragTarget extends PureComponent<DragTargetProps> {
  layout?: LayoutRectangle
  dropSubscription?: any
  moveSubscription?: any
  isInsideArea = false
  dropChannel?: any
  moveChannel?: any
  constructor(props: DragTargetProps) {
    super(props)
    const { moveChannel: propMoveChannel, dropChannel: propDropChannel } = props
    this.moveChannel = propMoveChannel || defaultMoveChannel
    this.dropChannel = propDropChannel || defaultDropChannel
  }

  componentDidMount = () => {
    const { onDrop, onEnterArea, onLeaveArea } = this.props
    this.dropSubscription = onDrop
      ? this.dropChannel.subscribe(
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
      ? this.moveChannel.subscribe(
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
    const {
      areaWidthMultiplier = 1,
      areaHeightMultiplier = 1,
      areaXOffset = 0,
      areaYOffset = 0,
    } = this.props

    const modifiedX = this.layout.x + areaXOffset
    const modifiedY = this.layout.y + areaYOffset
    const modifiedWidth = this.layout.width * areaWidthMultiplier
    const modifiedHeight = this.layout.height * areaHeightMultiplier

    const isWithinXRange = x > modifiedX
      && x < modifiedX + modifiedWidth
    const isWithinYRange = y > modifiedY
      && y < modifiedY + modifiedHeight
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
