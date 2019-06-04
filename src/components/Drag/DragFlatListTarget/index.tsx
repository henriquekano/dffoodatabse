import * as React from 'react'
import { PureComponent } from 'react'
import {
  FlatList,
  FlatListProps,
  LayoutChangeEvent,
  LayoutRectangle,
  NativeSyntheticEvent,
  NativeScrollEvent,
  GestureResponderEvent,
  PanResponderGestureState,
  ListRenderItemInfo,
} from 'react-native'
import { Subject } from 'rxjs'
import { moveChannel, dropChannel, Message } from '../contex'
import { DragTarget } from '../../index'

// Copied the following two from react's definitions
export interface DraggableRenderItemInfo<ItemT> extends ListRenderItemInfo<ItemT> {
  draggableHovering: boolean,
  draggableDropped: boolean,
}
export type DraggableRenderItem<ItemT> = (info: DraggableRenderItemInfo<ItemT>) => React.ReactElement | null
export type EventListener = (e: GestureResponderEvent, gestureState: PanResponderGestureState, value: any) => void
export type DataReducer<ItemT> = (item: ItemT, index: number) => string

export interface DragFlatListTargetProps<T> {
  data: T[],
  nameExtractor: DataReducer<T>,
  renderItem: DraggableRenderItem<T>,
  keyExtractor: DataReducer<T>,
  onDrop?: EventListener,
  onEnterArea?: EventListener,
  onLeaveArea?: EventListener,
  dragAreaXOffset?: number,
  dragAreaYOffset?: number,
  dragAreaWidthMultiplier?: number,
  dragAreaHeightMultiplier?: number,
}

class DragFlatListTarget<T> extends PureComponent<DragFlatListTargetProps<T>> {
  childrenRefs: DragTarget[] = []
  internalDropChannel = new Subject()
  internalMoveChannel = new Subject()
  state = {
    hoveringIndex: null,
    droppedIndex: null,
  }

  componentDidMount = () => {
    moveChannel.subscribe(
      ({ gestureResponderEvent, gestureState, value, target }: Message) => {
        const { hoveringIndex } = this.state
        const foundCell = this.searchPointedCell(
          gestureState.dx,
          gestureState.dy,
        )
        // console.log(hoveringIndex, this.state, foundCell)
        if (foundCell) {
          const { index } = foundCell
          if (hoveringIndex !== index) {
            this.setState({
              hoveringIndex: index,
            })
          }
        }
      }
    )
    dropChannel.subscribe(
      ({ gestureResponderEvent, gestureState, value, target }: Message) => {
        const { droppedIndex } = this.state
        const foundCell = this.searchPointedCell(
          gestureState.dx,
          gestureState.dy,
        )
        // console.log(droppedIndex, this.state, foundCell)
        if (foundCell) {
          const { index } = foundCell
          if (droppedIndex !== index) {
            this.setState({
              droppedIndex: index,
            })
          }
        }
      }
    )
  }

  componentWillUnmount = () => {
    this.internalMoveChannel.unsubscribe()
    this.internalDropChannel.unsubscribe()
  }

  listLayout?: LayoutRectangle
  handleInitialLayout = (e: LayoutChangeEvent) => {
    this.listLayout = e.nativeEvent.layout
  }

  itemsLayouts: LayoutRectangle[] = []
  handleItemLayout = (e: LayoutChangeEvent, index: number) => {
    this.itemsLayouts[index] = e.nativeEvent.layout
  }

  scrollOffset = { x: 0, y: 0 }
  handleOffsetChange = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    this.scrollOffset = { ...e.nativeEvent.contentOffset }
  }

  hasAllTheInformationNecessary = () =>
    this.listLayout && this.itemsLayouts.length > 0 && this.scrollOffset

  // gonna assume vertical list and that all children are in their own row
  searchPointedCell = (x: number, y: number) => {
    if (!this.hasAllTheInformationNecessary()) {
      return null
    }

    let verticalSum = -this.scrollOffset.y
    let index = 0
    for (; index < this.itemsLayouts.length && verticalSum < y; index ++) {
      verticalSum += this.itemsLayouts[index].height
    }

    // The last step sums the index and the summed height is >= y
    // i.e., it's pointing to the NEXT element
    // the '-1' fixes that. Maybe there's a more elegant way to do it...
    // Same logic with the verticalSum - this.itemsLayouts[index].height
    return {
      element: {
        ...this.itemsLayouts[index - 1],
        x: 0,
        y: verticalSum - this.itemsLayouts[index].height,
      },
      index: index - 1,
    }
  }

  render = () => {
    const {
      renderItem: dragTargetRenderItem,
      keyExtractor,
      nameExtractor,
      data,
      ...rest
    } = this.props
    const {
      hoveringIndex,
      droppedIndex,
    } = this.state
    console.log('rerendering!')
    return (
      <FlatList
        {...rest}
        extraData={this.state}
        data={data}
        onScroll={this.handleOffsetChange}
        renderItem={({ item, index, separators }) => {
          console.log('RERENDERIZING ' + index)
          return (
            <DragTarget
              ref={ref => {
                if (ref) {
                  this.childrenRefs[index] = ref
                }
              }}
              name={nameExtractor(item, index)}
              moveChannel={this.internalDropChannel}
              dropChannel={this.internalDropChannel}
              onLayout={(e) => this.handleItemLayout(e, index)}
            >
              {
                dragTargetRenderItem({
                  item,
                  index,
                  separators,
                  draggableHovering: hoveringIndex === index,
                  draggableDropped: droppedIndex === index,
                })
              }
            </DragTarget>
          )
        }}
        onLayout={this.handleInitialLayout}
      />
    )
  }
}

export default DragFlatListTarget
