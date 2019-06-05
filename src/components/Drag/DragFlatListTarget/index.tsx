import * as React from 'react'
import { PureComponent, Component } from 'react'
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
import { Subject, interval } from 'rxjs'
import { throttle } from 'rxjs/operators'
import { moveChannel, dropChannel, Message } from '../contex'
import { DragTarget } from '../../index'

interface RenderItemProps<T> {
  item: T,
  index: number,
  separators: any,
  hoveringIndex?: number,
  droppedIndex?: number,
  onLayout: any,
  nameExtractor: (item: T, index: number) => string,
  moveChannel: any,
  dropChannel: any,
  dragTargetRenderItem: (something: any) => any
}

class RenderItem<T> extends Component<RenderItemProps<T>> {
  constructor (props: RenderItemProps<T>) {
    super(props)
    const { index, hoveringIndex, droppedIndex } = props
    this.state = {
      droppedHere: hoveringIndex === index,
      hoveringHere: droppedIndex === index,
    }
  }

  shouldComponentUpdate = (nextProps: RenderItem<T>) => {
    const { index } = this.props
    const { hoveringHere, droppedHere } = this.state
    const { hoveringIndex: nextHovering, droppedIndex: nextDrop } = nextProps

    const isHoveringHere = nextHovering === index
    const isDroppedHere = nextDrop === index

    const changedHoverState = hoveringHere !== isHoveringHere
    const changedDropState = droppedHere !== isDroppedHere

    return changedDropState || changedHoverState
  }

  componentWillReceiveProps = (nextProps: RenderItem<T>) => {
    const { index } = this.props
    const { hoveringIndex: nextHovering, droppedIndex: nextDrop } = nextProps

    const nowItsHoveringHere = nextHovering === index
    const nowItHasDroppedHere = nextDrop === index
    this.setState({
      droppedHere: nowItHasDroppedHere,
      hoveringHere: nowItsHoveringHere,
    })
  }

  render = () => {
    const {
      dragTargetRenderItem,
      item,
      index,
      separators,
      hoveringIndex,
      droppedIndex,
      nameExtractor,
      moveChannel,
      dropChannel,
      onLayout,
    } = this.props
    return (
      <DragTarget
        onLayout={onLayout}
        name={nameExtractor(item, index)}
        moveChannel={moveChannel}
        dropChannel={dropChannel}
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
  }
}

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
    moveChannel
      .pipe(throttle(val => interval(50)))
      .subscribe(
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
    dropChannel
      .subscribe(
        ({ gestureResponderEvent, gestureState, value, target }: Message) => {
          const { onDrop } = this.props
          const { droppedIndex } = this.state
          const foundCell = this.searchPointedCell(
            gestureState.dx,
            gestureState.dy,
          )
          // console.log(droppedIndex, this.state, foundCell)
          if (foundCell) {
            const { index } = foundCell
            if (droppedIndex !== index) {
              this.setState(
                {
                  droppedIndex: index,
                }, () =>
                  onDrop && onDrop(gestureResponderEvent, gestureState, value)
                )
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

    try {
      let verticalSum = -this.scrollOffset.y + this.listLayout.y
      let index = 0
      for (; index < this.itemsLayouts.length && verticalSum < y; index ++) {
        const currentItem = this.itemsLayouts[index]
        verticalSum += currentItem.height
      }

      // The last step sums the index and the summed height is >= y
      // i.e., it's pointing to the NEXT element
      // the '-1' fixes that. Maybe there's a more elegant way to do it...
      // Same logic with the verticalSum - this.itemsLayouts[index].height
      if (index < this.itemsLayouts.length - 1) {
        return {
          element: {
            ...this.itemsLayouts[index - 1],
            x: 0,
            y: verticalSum - this.itemsLayouts[index].height,
          },
          index: index - 1,
        }
      }
      // Edge case: it's the last item
      return {
        element: {
          ...this.itemsLayouts[index - 1],
          x: 0,
          y: verticalSum - this.itemsLayouts[index - 1].height,
        },
        index: index - 1,
      }
    } catch (err) {
      // Pretty sure that if the 'currentItem'
      // is in process of changing, given the
      // asynchronous trait of the rxjs subject usage
      // of pan events, when calculating this sum,
      // a exception may occur - easily reproduceable
      // by dragging the draggable rapidly over the
      // list items
      return null
    }
  }

  renderItem = ({ item, index, separators }) => {
    const {
      hoveringIndex,
      droppedIndex,
    } = this.state
    const {
      renderItem: dragTargetRenderItem,
      keyExtractor,
      nameExtractor,
    } = this.props
    return (
      <RenderItem
        key={keyExtractor(item, index)}
        onLayout={(e) => this.handleItemLayout(e, index)}
        dragTargetRenderItem={dragTargetRenderItem}
        dropChannel={this.internalDropChannel}
        moveChannel={this.internalMoveChannel}
        droppedIndex={droppedIndex}
        hoveringIndex={hoveringIndex}
        index={index}
        item={item}
        nameExtractor={nameExtractor}
        separators={separators}
      />
    )
  }

  render = () => {
    const {
      renderItem: dragTargetRenderItem,
      keyExtractor,
      nameExtractor,
      data,
      ...rest
    } = this.props
    return (
      <FlatList
        {...rest}
        keyExtractor={keyExtractor}
        extraData={this.state}
        data={data}
        onScroll={this.handleOffsetChange}
        renderItem={this.renderItem}
        onLayout={this.handleInitialLayout}
      />
    )
  }
}

export default DragFlatListTarget
