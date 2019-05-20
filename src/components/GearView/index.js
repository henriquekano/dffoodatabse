import React, { PureComponent } from 'react'
import {
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native'
import PropTypes from 'prop-types'
import {
  Text,
  Image,
} from 'react-native-elements'
import FastImage from 'react-native-fast-image'
import R from 'ramda'

const limitBreakEmpty = require('../../../assets/limit-break-empty.png')
const limitBreakFilled = require('../../../assets/limit-break-filled.png')
const gearEmpty = require('../../../assets/empty-gear.png')

class GearView extends PureComponent {
  setLimitBreak = ({ limitBreakLevel: newLimitBreakLevel, gear }) => {
    const {
      onPressLimitBreak,
      limitBreakLevel,
    } = this.props
    const pressedTheSameButtonAsCurrentLevel = limitBreakLevel === newLimitBreakLevel
    if (pressedTheSameButtonAsCurrentLevel) {
      return onPressLimitBreak({ limitBreakLevel: 0, gear })
    }

    return onPressLimitBreak({ limitBreakLevel: newLimitBreakLevel, gear })
  }

  renderImage = () => {
    const {
      gear,
    } = this.props
    const gearImage = R.prop('icon')(gear)
    return (
      <ImageBackground
        style={{ flex: 1, width: null, height: null, aspectRatio: 278/198, justifyContent: 'center', alignItems: 'center' }}
        source={gearEmpty}
      >
        <FastImage
          style={{ flex: 1, width: null, height: null, aspectRatio: 278/198 }}
          source={{
            uri: gearImage,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
      </ImageBackground>
    )
  }

  render = () => {
    const {
      gear,
      limitBreakLevel,
    } = this.props
    const gearName = R.path(['name', 'en'])(gear)
    const characterName = R.path(['character', 'name'])(gear)
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          {this.renderImage()}
        </View>

        <View style={{ flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }}>
          <Text style={{ textAlign: 'center' }} numberOfLines={1} ellipsizeMode="tail">
            { gearName }
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity
              style={{ alignItems: 'center' }}
              onPress={() => this.setLimitBreak({
                limitBreakLevel: 1, gear,
              })}
            >
              <Image
                resizeMode="contain"
                style={{ maxHeight: 40, maxWidth: 40 }}
                source={limitBreakLevel > 0 ? limitBreakFilled : limitBreakEmpty}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ alignItems: 'center' }}
              onPress={() => this.setLimitBreak({
                limitBreakLevel: 2, gear,
              })}
            >
              <Image
                resizeMode="contain"
                style={{ maxHeight: 40, maxWidth: 40 }}
                source={limitBreakLevel > 1 ? limitBreakFilled : limitBreakEmpty}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ alignItems: 'center' }}
              onPress={() => this.setLimitBreak({
                limitBreakLevel: 3, gear,
              })}
            >
              <Image
                resizeMode="contain"
                style={{ maxHeight: 40, maxWidth: 40 }}
                source={limitBreakLevel > 2 ? limitBreakFilled : limitBreakEmpty}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

GearView.propTypes = {
  limitBreakLevel: PropTypes.number.isRequired,
  gear: PropTypes.shape({
    name: PropTypes.shape({
      en: PropTypes.string,
      jp: PropTypes.string,
    }),
    icon: PropTypes.string,
    character: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
  onPressLimitBreak: PropTypes.func.isRequired,
}

export default GearView
