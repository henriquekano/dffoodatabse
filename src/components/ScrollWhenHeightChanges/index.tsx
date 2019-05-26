import React, { PureComponent } from 'react'
import { ScrollView, ScrollViewProps, LayoutChangeEvent } from 'react-native'

class ScrollWhenHeightChanges extends PureComponent<ScrollViewProps> {
  state = {
    height: null,
  }

  saveInitialHeight = (e: LayoutChangeEvent) => {
    const newHeight = e.nativeEvent.layout.height
    console.log(newHeight)
    const { height } = this.state

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
