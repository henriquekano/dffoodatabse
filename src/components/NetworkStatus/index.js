import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import NetInfo from '@react-native-community/netinfo'

class NetworkStatus extends PureComponent {
  state = {
    connected: true,
  }

  componentDidMount = () => {
    NetInfo
      .addEventListener(
        'connectionChange',
        this.setConnectedState,
      )
  }

  componentWillUnmount = () => {
    NetInfo
      .removeEventListener(
        'connectionChange',
        this.setConnectedState,
      )
  }

  setConnectedState = ({ type }) => {
    const { onBackOnline } = this.props
    this
      .setState({
        connected: type !== 'none' && type !== 'unknown',
      }, onBackOnline)
  }

  render = () => {
    const { connected } = this.state
    return (
      !connected
        ? (
          <View style={{ padding: 5, flexDirection: 'row', backgroundColor: '#8b0000', justifyContent: 'center' }}>
            <Text style={{ color: 'white' }}>
              You are offline
            </Text>
          </View>
        )
        : null
    )
  }
}

NetworkStatus.defaultProps = {
  onBackOnline: () => {},
}

NetworkStatus.propTypes = {
  onBackOnline: PropTypes.func,
}

export default NetworkStatus
