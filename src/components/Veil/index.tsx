import * as React from 'react'
import { PureComponent } from 'react'
import { View, ViewProps, LayoutChangeEvent } from 'react-native'

export interface VeilProps extends ViewProps {
  conceal: boolean,
}

interface StateType {
  width: number,
  height: number,
  x: number,
  y: number,
}

export default class Veil extends PureComponent<VeilProps> {
  state: StateType
  constructor (props: VeilProps) {
    super(props)
    this.state = {
      width: 0,
      height: 0,
      x: 0,
      y: 0,
    }
  }

  render = () => {
    const { children, conceal, ...rest } = this.props
    const { height, width, x, y } = this.state
    return (
      <View
        onLayout={(event: LayoutChangeEvent) => {
          this.setState({
            ...event.nativeEvent.layout,
          })
        }}
        {...rest}
      >
        { children }
        {
          conceal
            ? (
              <View
                style={{
                  position: 'absolute',
                  top: y,
                  left: x,
                  width: width,
                  height: height,
                  backgroundColor: 'rgba(128, 128, 128, 0.5)'
                }}
              />
            )
            : null
        }
      </View>
    )
  }
}
