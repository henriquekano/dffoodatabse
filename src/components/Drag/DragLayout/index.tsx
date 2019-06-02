import * as React from 'react'
import { PureComponent } from 'react'
import { View, ViewProps, Animated } from 'react-native'

export interface DragLayoutProps extends ViewProps {
  isOpen: boolean,
}

class DragLayout extends PureComponent<DragLayoutProps> {
  state = {
    width: new Animated.Value(0),
  }
  openAnimation = Animated.timing(
    this.state.width,
    {
      toValue: 1,
      duration: 100,
    }
  )
  closeAnimation = Animated.timing(
    this.state.width,
    {
      toValue: 0,
      duration: 100,
    }
  )

  open = () => {
    this.closeAnimation.stop()
    this.openAnimation.start()
  }

  close = () => {
    this.openAnimation.stop()
    this.closeAnimation.start()
  }

  render = () => {
    const { children, isOpen, ...rest } = this.props
    const { width } = this.state
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          position: 'absolute',
          width: '100%',
          height: '100%',
          marginTop: 56,
          flex: 2,
        }}
        {...rest}
      >
        <Animated.View
          style={{
            width: width.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '50%']
            }),
            backgroundColor: 'white'
          }}
        >
          { children }
        </Animated.View>
      </View>
    )
  }
}

export default DragLayout
