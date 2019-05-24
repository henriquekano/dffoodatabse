import React, { PureComponent } from 'react'
import {
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native'
import PropTypes from 'prop-types'
import {
  Text,
  CheckBox,
} from 'react-native-elements'
import { View as AnimatedView } from 'react-native-animatable'
import FastImage from 'react-native-fast-image'
import R from 'ramda'

const limitBreakEmpty = require('../../../assets/limit-break-empty.png')
const limitBreakFilled = require('../../../assets/limit-break-filled.png')
const gearEmpty = require('../../../assets/empty-gear.png')

class GearView extends PureComponent {

  componentDidUpdate = () => {
    const {
      limitBreakLevel,
    } = this.props
    if (limitBreakLevel === 3) {
      Promise.all([
        Promise.resolve(this.animatedViewRef.flash(1000)),
        Promise.resolve(this.animatedViewRef.tada(1000)),
      ])
    }
  }

  getAnimatedViewRef = (ref) => { this.animatedViewRef = ref }

  setLimitBreak = ({ limitBreakLevel: newLimitBreakLevel, gear }) => {
    const {
      onPressLimitBreak,
      limitBreakLevel,
    } = this.props
    const pressedTheSameButtonAsCurrentLevel = limitBreakLevel === newLimitBreakLevel
    if (pressedTheSameButtonAsCurrentLevel) {
      return onPressLimitBreak({ limitBreakLevel: -1, gear })
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
        style={{ flex: 1, width: null, height: null, maxWidth: '100%', aspectRatio: 278/198, justifyContent: 'center', alignItems: 'center' }}
        source={gearEmpty}
        resizeMode="contain"
      >
        <FastImage
          style={{ flex: 1, width: null, height: null, maxWidth: '100%', maxHeight: '100%', aspectRatio: 278/198 }}
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
      <AnimatedView ref={this.getAnimatedViewRef} style={{ flex: 1, alignItems: 'center' }}>
        <Text style={{ textAlign: 'center' }} numberOfLines={1} ellipsizeMode="tail">
          { gearName }
        </Text>

        <View style={{ flex: 4, alignItems: 'center' }}>
          {this.renderImage()}
        </View>

        <View style={{ flex: 1, flexDirection: 'column', alignItems: 'stretch', justifyContent: 'center', padding: 0 }}>
          <View style={{ height: '100%', width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <View
              style={{ alignItems: 'center', maxWidth: '25%' }}
            >
              <CheckBox
                center
                checkedColor="green"
                checked={limitBreakLevel >= 0}
                onPress={() => this.setLimitBreak({
                  limitBreakLevel: 0, gear,
                })}
              />
            </View>
            <TouchableOpacity
              style={{ alignItems: 'center', maxWidth: '25%' }}
              onPress={() => this.setLimitBreak({
                limitBreakLevel: 1, gear,
              })}
            >
              <Image
                resizeMode="contain"
                style={{ maxHeight: '100%', maxWidth: '100%' }}
                source={limitBreakLevel >= 1 ? limitBreakFilled : limitBreakEmpty}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ alignItems: 'center', maxWidth: '25%' }}
              onPress={() => this.setLimitBreak({
                limitBreakLevel: 2, gear,
              })}
            >
              <Image
                resizeMode="contain"
                style={{ maxHeight: '100%', maxWidth: '100%' }}
                source={limitBreakLevel >= 2 ? limitBreakFilled : limitBreakEmpty}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ alignItems: 'center', maxWidth: '25%' }}
              onPress={() => this.setLimitBreak({
                limitBreakLevel: 3, gear,
              })}
            >
              <Image
                resizeMode="contain"
                style={{ maxHeight: '100%', maxWidth: '100%' }}
                source={limitBreakLevel >= 3 ? limitBreakFilled : limitBreakEmpty}
              />
            </TouchableOpacity>
          </View>
        </View>
      </AnimatedView>
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
