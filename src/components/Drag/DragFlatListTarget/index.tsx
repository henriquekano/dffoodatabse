import * as React from 'react'
import { PureComponent } from 'react'
import {
  FlatList,
  FlatListProps,
  LayoutChangeEvent,
  LayoutRectangle,
  View,
  PointPropType,
  NativeSyntheticEvent,
  NativeScrollEvent,
  PanResponder,
  GestureResponderEvent,
  PanResponderGestureState,
} from 'react-native'
import { Subject } from 'rxjs'
import { moveChannel, dropChannel } from '../contex'
import { DragTarget } from '../../index'

export interface DragFlatListTargetProps<T> extends FlatListProps<T> {
  nameExtractor: (item: T, index: number) => string,
  onDrop?: (e: GestureResponderEvent, gestureState: PanResponderGestureState, value: any) => void,
  onEnterArea?: (e: GestureResponderEvent, gestureState: PanResponderGestureState, value: any) => void,
  onLeaveArea?: (e: GestureResponderEvent, gestureState: PanResponderGestureState, value: any) => void,
  areaXOffset?: number,
  areaYOffset?: number,
  areaWidthMultiplier?: number,
  areaHeightMultiplier?: number,
}

class DragFlatListTarget<T> extends PureComponent<DragFlatListTargetProps<T>> {
  moveSubject?: any
  dropSubject?: any
  constructor(props: DragFlatListTargetProps<T>) {
    super(props)
    this.moveSubject = new Subject()
    this.dropSubject = new Subject()
  }

  listLayout?: LayoutRectangle
  handleInitialLayout = (e: LayoutChangeEvent) => {
    console.log(e.nativeEvent.layout)
    this.listLayout = e.nativeEvent.layout
  }

  itemsLayouts: LayoutRectangle[] = []
  handleItemLayout = (e: LayoutChangeEvent, index: number) => {
    this.itemsLayouts[index] = e.nativeEvent.layout
    console.log(this.itemsLayouts)
  }

  scrollOffset = { x: 0, y: 0 }
  handleOffsetChange = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    this.scrollOffset = { ...e.nativeEvent.contentOffset }
    console.log(this.scrollOffset)
  }

  hasAllTheInformationNecessary = () =>
    this.listLayout && this.itemsLayouts.length > 0 && this.scrollOffset

  // gonna assume vertical list
  searchPointedCell = (x: number, y: number) => {
    if (!this.hasAllTheInformationNecessary()) {
      return null
    }

    let verticalSum = this.scrollOffset.y
    let index = 0
    for (; index < this.itemsLayouts.length && verticalSum < y; i++) {
      verticalSum += this.itemsLayouts[index].height
    }

    return this.itemsLayouts[index]
  }

  panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (e, gestureState) => {
      moveChannel.next({
        gestureResponderEvent: e,
        gestureState,
        value: this.props.value,
        target: this.props.targetName,
      })
    },
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

  render = () => {
    const { renderItem, keyExtractor, ...rest } = this.props
    return (
      <FlatList
        {...rest}
        onScroll={this.handleOffsetChange}
        renderItem={({ item, index }) => (
          <View
            onLayout={(e) => this.handleItemLayout(e, index)}
          >
            { renderItem({ item, index }) }
          </View>
        )}
        onLayout={this.handleInitialLayout}
      />
    )
  }
}

export default DragFlatListTarget
