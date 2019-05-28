import React, { PureComponent } from 'react'
import { ScrollView, ScrollViewProps, LayoutChangeEvent } from 'react-native'

export interface ScrollWhenHeightChangesProps extends ScrollViewProps {
  threshold?: number,
}

class ScrollWhenHeightChanges extends PureComponent<ScrollWhenHeightChangesProps> {
  state = {
    height: null,
  }

  saveInitialHeight = (e: LayoutChangeEvent) => {
    const newHeight = e.nativeEvent.layout.height
    const { height } = this.state
    const { threshold = 1 } = this.props

    const newHeightLessThanThreshold = height && newHeight <= height * threshold

    if (!height) {
      this.setState({
        height: newHeight,
      })
      return
    }
  }

  resolveContentStyle = () => {
    const { contentContainerStyle } = this.props
    const { height } = this.state
    if (!height) {
      return contentContainerStyle
    }

    return [
      contentContainerStyle,
      {
        flex: 0,
        height,
      }
    ]
  }

  render = () => {
    const {
      ...restOfProps
    } = this.props
    return (
      <ScrollView
        {...restOfProps}
        contentContainerStyle={this.resolveContentStyle()}
        onLayout={this.saveInitialHeight}
        scrollEnabled={true}
      />
    )
  }
}

export default ScrollWhenHeightChanges
