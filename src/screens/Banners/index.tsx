import * as React from 'react'
import { useEffect, useState } from 'react'
import { View, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import Timeline from 'react-native-timeline-listview'
import FastImage from 'react-native-fast-image'
import { Text, Searchbar } from 'react-native-paper'
import { NavigationScreenProps } from 'react-navigation'
import R from 'ramda'
import _ from 'lodash'
import { Header } from '../../components'
import BannersPresentational, { BannerWithCharacters } from '../../presentational/Banners'
import { fetchBannerInformation } from '../../redux/actions'
import StateProps from '../../redux/stateTypes'
import { Banner } from '../../../types/common'
import { BANNERS } from '../../react-navigation/routes'

interface BannersProps extends NavigationScreenProps {
  fetchingBanners: boolean,
  fetchingBannersError?: any,
  banners?: BannerWithCharacters[],
  fetchBannerInformation: () => void,
}

const Banners = ({
  fetchingBanners,
  fetchingBannersError,
  banners,
  fetchBannerInformation,
  navigation,
}: BannersProps) => {
  const [characterNameFilter, setCharacterNameFilter] = useState('')
  const [filteredBanners, setFilteredBanners] = useState(banners)

  const componentDidMount = () => {
    useEffect(() => {
      fetchBannerInformation()
    }, [])
  }

  const applyFiltersToBanners = () => {
    if (banners) {
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
      return
    }
    setFilteredBanners(banners)
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

  const filteredBannersChanged = () => {
    useEffect(() => {
      // console.log(filteredBanners)
    }, [filteredBanners])
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
    filteredBannersChanged,
  ].forEach(fn => fn())

  return (
    <BannersPresentational
      banners={filteredBanners}
      fetchingBanners={fetchingBanners}
      fetchingBannersError={fetchingBannersError}
      onCharacterTextChange={_.debounce(setCharacterNameFilter, 300)}
      onDrawerPress={() => navigation.openDrawer()}
      errorRetry={fetchBannerInformation}
    />
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

const mapStateToProps = (store: StateProps): BannersProps => ({
  fetchingBanners: store.fetchingBanners,
  fetchingBannersError: store.fetchingBannersError,
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
