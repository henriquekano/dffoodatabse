import * as React from 'react'
import { useEffect, useState } from 'react'
import { View, ImageBackground, Image, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import Timeline from 'react-native-timeline-listview'
import FastImage from 'react-native-fast-image'
import { Text, Searchbar } from 'react-native-paper'
import R from 'ramda'
import _ from 'lodash'
import { fetchBannerInformation } from '../../redux/actions'
import StateProps from '../../redux/stateTypes'
import { Banner } from '../../../types/common'
import {  } from '../../data-formatter/string'

interface BannerWithCharacters extends Banner {
  characters: string,
}

const TimelineItem = ({
  rowData,
}: { rowData: BannerWithCharacters }) => (
  <View style={{ width: '100%', alignContent: 'flex-start' }}>
    <View style={{ flex: 1, maxWidth: '100%', justifyContent: 'flex-start', backgroundColor: 'lightgrey' }}>
      <FastImage
        style={{ flex: 1, width: '100%', aspectRatio: 844 / 387, zIndex: 1 }}
        source={{
          uri: rowData.image,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.contain}
      />
      <ActivityIndicator
        style={{ position: 'absolute', top: '50%', left: '50%', right: '50%', bottom: '50%', zIndex: 0 }}
      />
    </View>
    {/* {
      rowData.characters.map((character, index) => (
        <Text key={character + index}>
          { character }
        </Text>
      ))
    } */}
  </View>
)

const Banners = ({
  fetchingBanners,
  fetchingBannersError,
  banners,
  fetchBannerInformation,
}) => {
  const [characterNameFilter, setCharacterNameFilter] = useState('')
  const [filteredBanners, setFilteredBanners] = useState(banners)

  const componentDidMount = () => {
    useEffect(() => {
      fetchBannerInformation()
    }, [])
  }

  const applyFiltersToBanners = () => {
    const newFilteredBanners = R.filter(
      R.pipe(
        R.prop('characters'),
        R.map(R.pipe(
          R.toLower,
          R.replace(/\W/g, ''),
        )),
        R.any(R.contains(R.toLower(characterNameFilter)))
      )
    )(banners)
    setFilteredBanners(newFilteredBanners)
  }

  const bannersChangedEffect = () => {
    useEffect(() => {
      if (characterNameFilter) {
        applyFiltersToBanners()
      } else {
        setFilteredBanners(banners)
      }
    }, [banners])
  }

  const characterNameFilterChanged = () => {
    useEffect(() => {
      applyFiltersToBanners()
    }, [characterNameFilter])
  }

  [
    componentDidMount,
    bannersChangedEffect,
    characterNameFilterChanged,
  ].forEach(fn => fn())

  return (
    <View style={{ flex: 1 }}>
      <Timeline
        lineColor='rgb(45,156,219)'
        timeContainerStyle={{minWidth:52, marginTop: -5}}
        descriptionStyle={{color:'gray'}}
        options={{
          style:{paddingTop:5}
        }}
        renderDetail={(rowData: BannerWithCharacters) => {
          return (
            <TimelineItem rowData={rowData}/>
          )
        }}
        data={filteredBanners || []}
      />
      <Searchbar
        onChangeText={_.debounce(setCharacterNameFilter, 350)}
      />
    </View>
  )
}

const mergeRelatedCharacterForEachBanner = (store: StateProps) => {
  const searchGearByJpnName = (jpnName: string) => R.filter(
    R.pathEq(['name', 'jp'], jpnName)
  )

  if (store.banners) {
    const constructNewBanners = R.map((banner: Banner) => {
      const { gears } = banner
      const charactersOnBanner = gears.map((gearName) => {
        const savedGear = searchGearByJpnName(gearName)(store.gears || [])
        const foundMoreThanOneMatchingGear = savedGear.length > 1
        const foundNoMathingGear = savedGear.length === 0
        if (foundNoMathingGear) {
          return null
        }

        // approximation: since there are multiple gears
        // with the same name, I'm returning everyone involved
        // Don't forget to flatten
        return R.uniq(savedGear.map((gear) => {
          return gear.character.name
        }))

        const characterSlug = savedGear[0].character.name

        return characterSlug
      })

      return {
        ...banner,
        characters: R.pipe(
          R.flatten,
          R.uniq,
          R.reject(R.isNil),
        )(charactersOnBanner),
      }
    })
    return {
      ...store,
      banners: R.reverse(constructNewBanners(store.banners))
    }
  }

  return store
}

const tagTimeForEachBanner = R.over(
  R.lensProp('banners'),
  R.map((bannerData: Banner) => ({
    ...bannerData,
    time: `Q${bannerData.quarter} ${bannerData.year}`,
  }))
)

const mapStateToProps = (store: StateProps) => ({
  fetchingBanners: store.fetchingBanners,
  fethingBannersError: store.fethingBannersError,
  banners: !store.banners
    ? store.banners
    : R.pipe(
      tagTimeForEachBanner,
      mergeRelatedCharacterForEachBanner,
      R.prop('banners')
    )(store)
})

const mapActionsToProps = (dispatch: Dispatch) => bindActionCreators({
  fetchBannerInformation,
}, dispatch)

export default connect(mapStateToProps, mapActionsToProps)(Banners)
