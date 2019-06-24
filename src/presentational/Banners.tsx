import * as React from 'react'
import { View, ActivityIndicator, Image } from 'react-native'
import Timeline from 'react-native-timeline-feed'
import FastImage from 'react-native-fast-image'
import { Text, Searchbar, Button } from 'react-native-paper'
import R from 'ramda'
import { Header, NetworkStatus } from '../components'
import { Banner } from '../../types/common'
import { BANNERS } from '../react-navigation/routes'

export interface BannerWithCharacters extends Banner {
  characters: string[],
}

interface TimelineItemProps {
  rowData: BannerWithCharacters,
}

const TimelineItem = ({
  rowData,
}: TimelineItemProps) => (
  <View style={{ width: '100%', alignContent: 'flex-start' }}>
    <View style={{ flex: 1, maxWidth: '100%', justifyContent: 'flex-start', backgroundColor: 'lightgrey' }}>
      <FastImage
        style={{ flex: 1, width: '100%', minHeight: 100, aspectRatio: 844 / 387, zIndex: 2 }}
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
  </View>
)

const ErrorState = ({
  error,
  errorRetry,
}: { error: any, errorRetry: () => void, }) => (
  <View
    style={{
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Text>
      Something went wrong. Sorry :C
    </Text>
    <Text>
      {JSON.stringify(error)}
    </Text>
    <Button onPress={errorRetry}>
      Try again
    </Button>
  </View>
)

const LoadingState = () => (
  <View
    style={{
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <ActivityIndicator size="large" />
  </View>
)

const BannerListState = ({
  onDrawerPress,
  bannerList,
  onCharacterTextChange,
}: {
  onDrawerPress: () => void,
  bannerList: BannerWithCharacters[],
  onCharacterTextChange: (query: string) => void,
}) => (
  <View style={{ flex: 1, paddingHorizontal: 10, paddingBottom: 10 }}>
    <Timeline
      lineColor='rgb(45,156,219)'
      timeContainerStyle={{ minWidth:52 }}
      options={{
        style:{ paddingTop:5 }
      }}
      renderDetail={({ item }: { item: BannerWithCharacters }) => {
        return (
          <TimelineItem
            key={item.image}
            rowData={item}
          />
        )
      }}
      data={bannerList}
      flatListProps={{
        keyExtractor: (item: BannerWithCharacters) =>
          item.image + item.year + item.quarter
      }}
    />
    <Searchbar onChangeText={onCharacterTextChange}/>
  </View>
)

interface BannersProps {
  fetchingBanners: boolean,
  fetchingBannersError?: any,
  banners?: BannerWithCharacters[],
  onCharacterTextChange: (query: string) => void,
  onDrawerPress: () => void,
  errorRetry: () => void,
}

const Banners = ({
  fetchingBanners,
  fetchingBannersError,
  banners,
  onCharacterTextChange,
  onDrawerPress,
  errorRetry,
}: BannersProps) => {
  const bannerDataExists = !!banners && !R.isNil(banners.length)
  const isLoading = !bannerDataExists && fetchingBanners
  const couldntLoadBanners = !bannerDataExists && !!fetchingBannersError

  return (
    <View style={{ flex: 1 }}>
      <Header title={BANNERS} onDrawerPress={onDrawerPress}/>
      <NetworkStatus />
      {
        couldntLoadBanners
          ? (
            <ErrorState
              error={fetchingBannersError}
              errorRetry={errorRetry}
            />
          )
          : null
      }
      {
        isLoading
          ? <LoadingState />
          : null
      }
      {
        !couldntLoadBanners && !isLoading
          ? (
            <BannerListState
              bannerList={banners || []}
              onCharacterTextChange={onCharacterTextChange}
              onDrawerPress={onDrawerPress}
            />
          )
          : null
      }
    </View>
  )
}

export default Banners
