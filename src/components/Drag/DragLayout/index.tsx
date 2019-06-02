import * as React from 'react'
import { PureComponent } from 'react'
import { View, ViewProps, Animated, StyleSheet } from 'react-native'
import { Card } from 'react-native-paper'
import { IconButton } from '../../index'

export interface DragLayoutProps extends ViewProps {
}

class DragLayout extends PureComponent<DragLayoutProps> {
  state = {
    width: new Animated.Value(0),
    isOpen: false,
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
    this.setState({
      isOpen: true,
    }, () => {
      this.closeAnimation.stop()
      this.openAnimation.start()
    })
  }

  close = () => {
    this.setState({
      isOpen: false,
    }, () => {
      this.openAnimation.stop()
      this.closeAnimation.start()
    })
  }

  toggle = () => {
    const { isOpen } = this.state
    if (isOpen) {
      this.close()
    } else {
      this.open()
    }
  }

  render = () => {
    const { children, ...rest } = this.props
    const { width, isOpen } = this.state
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
        <View
          style={{
            justifyContent: 'center',
          }}
        >
          <Card
            style={{
              backgroundColor: 'white',
              borderWidth: StyleSheet.hairlineWidth,
              borderColor: 'lightgrey',
            }}
          >
            <IconButton
              icon={isOpen ? 'close' : 'label'}
              onPress={this.toggle}
            />
          </Card>
        </View>
        <Animated.View
          style={{
            width: width.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '50%']
            }),
            backgroundColor: 'white',
            borderLeftWidth: StyleSheet.hairlineWidth,
            borderColor: 'lightgrey',
          }}
        >
          { children }
        </Animated.View>
      </View>
    )
  }
}

export default DragLayout
