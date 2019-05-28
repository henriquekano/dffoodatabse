import * as React from 'react'
import { View, ActivityIndicator, ScrollView, KeyboardAvoidingView } from 'react-native'
import { Text, Icon } from 'react-native-elements'
import { Chip, Searchbar } from 'react-native-paper'
import * as _ from 'lodash'
import {
  ScrollWhenHeightChanges,
  SnappyScrollView,
  GearView,
  ModalFilter,
  NetworkStatus,
  Header,
} from '../components/index'
import { Gear, SavedGear } from '../../types/common'
import StateProps from '../redux/stateTypes'

const R = require('ramda')

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

const ErrorState = (err: any) => (
  <View
    style={{
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Text h4>
      Something went wrong. Sorry :C
    </Text>
    <Text h4>
      {String(err)}
    </Text>
  </View>
)

const NoResultState = () => (
  <View
    style={{
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Icon name="whatever" />
    <Text>Found a whooping 0 results</Text>
  </View>
)

interface Filters {
  nameFilter: string,
  roleFilter: string[],
}

const Filters = ({
  nameFilter,
  roleFilter,
}: Filters) => {
  return (
    <View>
      <ScrollView horizontal>
        {
          nameFilter
            ? (
              <Chip mode="outlined" style={{ margin: 5 }}>
                { `"${nameFilter}"` }
              </Chip>
            )
            : null
        }
        {
          roleFilter && roleFilter.length > 0
            ? (
              roleFilter.map(role => (
                <Chip mode="outlined" style={{ margin: 5 }} key={role}>
                  { role }
                </Chip>
              ))
            )
            : null
        }
      </ScrollView>
    </View>
  )
}

interface RenderGearViewProps {
  data: {
    data: Gear,
    key: string,
  },
  savedGears: SavedGear[],
  onSaveGear: ({ limitBreakLevel, gear }: SavedGear) => void
}

const RenderGearView = ({ data: { data }, savedGears, onSaveGear }: RenderGearViewProps) => {
  const thisGearIcon = data.icon
  const thisGearSavedLimitBreakLevel = R.pipe(
    R.filter(
      R.pathEq(['gear', 'icon'], thisGearIcon),
    ),
    R.head,
    R.propOr(-1, 'limitBreakLevel'),
  )(savedGears)
  return (
    <View
      style={{ backgroundColor: 'white', borderRadius: 10, borderColor: 'lightgrey', borderWidth: 1, flex: 1, padding: 10, margin: 5, width: '50%' }}>
      <GearView
        gear={data}
        limitBreakLevel={thisGearSavedLimitBreakLevel}
        onPressLimitBreak={onSaveGear}
      />
    </View>
  )
}

interface GearListStateProps {
  pagerItemsToShow: number,
  nameFilter: string,
  roleFilter: string[],
  filteredGears: Gear[],
  onSaveGear: ({ limitBreakLevel, gear }: SavedGear) => void,
  savedGears: SavedGear[],
}

const GearListState = ({
  pagerItemsToShow,
  nameFilter,
  roleFilter,
  filteredGears: gears,
  onSaveGear,
  savedGears,
}: GearListStateProps) => {
  const hasFilter = nameFilter || roleFilter && roleFilter.length > 0

  const formatToFlatListData = R.map(
    R.applySpec({
      data: R.identity,
      key: R.path(['name', 'en']),
    }),
  )

  const formattedGears = R.pipe(
    formatToFlatListData,
  )(gears)

  const hasResults = gears && gears.length > 0

  return (
    <View style={{ flex: 1 }}>
      <ScrollWhenHeightChanges threshold={0.4} contentContainerStyle={{ flex: 1 }}>
        {
          hasFilter
            ? (
              <Filters
                nameFilter={nameFilter}
                roleFilter={roleFilter}
              />
            )
            : null
        }
        {
          hasResults
            ? (
              <SnappyScrollView
                data={formattedGears}
                itemsPerPage={pagerItemsToShow}
                renderItem={(data) => (
                  <RenderGearView
                    key={`${data.key}+${data.data.character.name}`}
                    data={data}
                    onSaveGear={onSaveGear}
                    savedGears={savedGears}
                  />
                )}
              />
            )
            : (
              <NoResultState />
            )
        }
      </ScrollWhenHeightChanges>
    </View>
  )
}

interface RenderModalProps {
  filterOpen: boolean,
  roleFilter: string[],
  nameFilter: string,
  characterRoles: string[],
  onApply: () => void,
  onClose: () => void,
  onPressRole: (role: string) => void
  onTypeCharacterName: (text: string) => void
}

const RenderModal = ({
  filterOpen,
  roleFilter,
  nameFilter,
  characterRoles,
  onApply,
  onClose,
  onPressRole,
  onTypeCharacterName,
}: RenderModalProps) => (
  <ModalFilter
    filterOpen={filterOpen}
    characterRoles={characterRoles}
    filters={{
      role: roleFilter,
      characterNameFilter: nameFilter,
    }}
    onApply={onApply}
    onClose={onClose}
    onPressRole={onPressRole}
    onTypeCharacterName={onTypeCharacterName}
  />
)

export interface GearsListPresentationalProps extends StateProps, RenderModalProps, GearListStateProps, RenderGearViewProps {
  onFilterPress: () => void,
  handleSearchBarType: (text: string) => void,
  onChartPress: () => void,
  onCharacterPress: () => void,
}

const GearsListPresentational = ({
  fetchingGears,
  fetchError,
  gears,
  filteredGears,
  onFilterPress,
  handleSearchBarType,
  onChartPress,
  onCharacterPress,
  roleFilter,
  nameFilter,
  savedGears,

  // modal props
  filterOpen,
  characterRoles,
  onApply,
  onClose,
  onPressRole,
  onTypeCharacterName,

  // gear list
  pagerItemsToShow,
  onSaveGear,
}: GearsListPresentationalProps) => {
  const gearsLoaded = gears && gears.length > 0
  const hasResults = filteredGears && filteredGears.length > 0
  return (
    <View style={{ flex: 1 }}>
      <Header
        onFilterPress={onFilterPress}
        onChartPress={onChartPress}
        onCharacterPress={onCharacterPress}
      />
      <NetworkStatus />
      {
        fetchError && !gearsLoaded
          ? <ErrorState err={fetchError}/>
          : null
      }
      {
        fetchingGears && !gearsLoaded
          ? <LoadingState />
          : null
      }
      {
        gearsLoaded
          ? (
            <GearListState
              filteredGears={filteredGears}
              nameFilter={nameFilter}
              pagerItemsToShow={pagerItemsToShow}
              roleFilter={roleFilter}
              onSaveGear={onSaveGear}
              savedGears={savedGears}
            />
          )
          : null
      }
      {
        gearsLoaded
          ? (
            <Searchbar
              onChangeText={handleSearchBarType}
              placeholder="Gear name"
            />
          )
          : null
      }
      <RenderModal
        characterRoles={characterRoles}
        filterOpen={filterOpen}
        nameFilter={nameFilter}
        onApply={onApply}
        onClose={onClose}
        onPressRole={onPressRole}
        onTypeCharacterName={onTypeCharacterName}
        roleFilter={roleFilter}
      />
    </View>
  )
}

export default GearsListPresentational
