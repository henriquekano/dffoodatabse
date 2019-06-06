import * as React from 'react'
import { PureComponent } from 'react'
import { View, ViewProps, Animated, StyleSheet, Dimensions } from 'react-native'
import { Card } from 'react-native-paper'
import { IconButton } from '../../index'

const { width: screenWidth } = Dimensions.get('screen')

export interface DragLayoutProps extends ViewProps {
  onPressNub: () => void,
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
    this.closeAnimation.stop()
    this.openAnimation.start(() =>
      this.setState({
        isOpen: true,
      })
    )
  }

  close = () => {
    this.openAnimation.stop()
    this.closeAnimation.start(() =>
      this.setState({
        isOpen: false,
      })
    )
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
    const { children, onPressNub, ...rest } = this.props
    const { width, isOpen } = this.state
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          position: 'absolute',
          width: '100%',
          height: '100%',
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
              onPress={onPressNub}
            />
          </Card>
        </View>
        <Animated.View
          style={{
            width: width.interpolate({
              inputRange: [0, 1],
              outputRange: [0, screenWidth / 2]
            }),
            backgroundColor: 'white',
            borderLeftWidth: StyleSheet.hairlineWidth,
            borderColor: 'lightgrey',
          }}
        >
          <View style={{ width: screenWidth / 2 }}>
            { children }
          </View>
        </Animated.View>
      </View>
    )
  }
}

export default DragLayout
