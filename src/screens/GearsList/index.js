import React, { PureComponent } from 'react'
import {
  View,
  ActivityIndicator,
  ScrollView,
} from 'react-native'
import {
  Text,
  Icon,
} from 'react-native-elements'
import {
  Chip,
  Searchbar,
} from 'react-native-paper'
import { connect } from 'react-redux'
import R from 'ramda'
import _ from 'lodash'
import {
  GearView,
  NetworkStatus,
  SnappyScrollView,
  ModalFilter,
  Header,
  ScrollWhenHeightChanges,
} from '../../components'
import { store } from '../../redux/store.ts'
import {
  fetchFromDissidiadb,
  saveOwnedGear,
  applyFilters,
} from '../../redux/actions.ts'
import { INSIGHTS } from '../../react-router/routes'
import { GearsListPresentational } from '../../presentational'

class GearList extends PureComponent {
  constructor(props) {
    super(props)
    // gotta save a local state for
    // this is saved in the Storage, which takes sometime
    // and causes the button to respond slowlly
    this.state = {
      filterOpen: false,
      nameFilter: null,
      roleFilter: [],
      pagerItemsToShow: 6,
    }
  }

  componentDidMount = () => {
    store.dispatch(fetchFromDissidiadb())
  }

  handleSaveGear = ({ gear, limitBreakLevel }) => {
    store.dispatch(saveOwnedGear({
      gear,
      limitBreakLevel,
    }))
  }

  handleOpenFilter = () => {
    this.setState({
      filterOpen: true,
    })
  }

  handleNameFilterType = (name) => {
    this.setState({
      nameFilter: name,
    })
  }

  handleCloseFilter = () => {
    this.setState({
      filterOpen: false,
    })
  }

  handleChartPress = () => {
    const { history } = this.props
    history.push(INSIGHTS)
  }

  handleSearchBarType = (text) => {
    const {
      nameFilter,
      roleFilter,
    } = this.state
    this.setState(
      {

      },
      () => store.dispatch(applyFilters({
        characterNameFilter: nameFilter,
        roleFilter,
        gearNameFilter: text,
      })),
    )
  }

  renderLoading = () => (
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

  renderError = err => (
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

  renderFilters = () => {
    const {
      nameFilter,
      roleFilter,
    } = this.state

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

  renderItem = ({ data, key }) => {
    const { savedGears } = this.props

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
        key={`${key}+${data.character.name}`}
        style={{ backgroundColor: 'white', borderRadius: 10, borderColor: 'lightgrey', borderWidth: 1, flex: 1, padding: 10, margin: 5, width: '50%' }}>
        <GearView
          gear={data}
          limitBreakLevel={thisGearSavedLimitBreakLevel}
          onPressLimitBreak={this.handleSaveGear}
        />
      </View>
    )
  }

  renderGears = () => {
    const {
      pagerItemsToShow,
      nameFilter,
      roleFilter,
    } = this.state
    const { filteredGears: gears } = this.props

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

    return (
      <View style={{ flex: 1 }}>
        <ScrollWhenHeightChanges threshold={0.4} contentContainerStyle={{ flex: 1 }}>
          {
            hasFilter
              ? this.renderFilters()
              : null
          }
          <SnappyScrollView
            data={formattedGears}
            itemsPerPage={pagerItemsToShow}
            renderItem={this.renderItem}
          />
        </ScrollWhenHeightChanges>
      </View>
    )
  }

  closeFilterModal = () => {
    const {
      nameFilter,
      roleFilter,
    } = this.state
    this.setState(
      {
        filterOpen: false,
      },
      () => store.dispatch(applyFilters({
        characterNameFilter: nameFilter,
        roleFilter,
      })),
    )
  }

  addRoleFilter = (role) => {
    const {
      roleFilter,
    } = this.state
    if (R.contains(role, roleFilter)) {
      this.setState(prevState => ({
        roleFilter: R.filter(
          R.complement(R.equals(role)),
          prevState.roleFilter,
        ),
      }))
    } else {
      this.setState(prevState => ({
        roleFilter: [
          ...prevState.roleFilter,
          role,
        ],
      }))
    }
  }

  renderModal = () => {
    const {
      filterOpen,
      roleFilter,
      nameFilter,
    } = this.state
    const {
      characterRoles,
    } = this.props

    return (
      <ModalFilter
        filterOpen={filterOpen}
        characterRoles={characterRoles}
        filters={{
          role: roleFilter,
          characterNameFilter: nameFilter,
        }}
        onApply={this.closeFilterModal}
        onClose={this.handleCloseFilter}
        onPressRole={this.addRoleFilter}
        onTypeCharacterName={this.handleNameFilterType}
      />
    )
  }

  renderNoResults = () => (
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

  render = () => {
    const {
      fetchingGears,
      fetchingError,
      gears,
      filteredGears,
      characterRoles,
      history,
      savedGears,
    } = this.props
    const {
      filterOpen,
      nameFilter,
      pagerItemsToShow,
      roleFilter,
    } = this.state

    const gearsLoaded = gears && gears.length > 0
    const hasResults = filteredGears && filteredGears.length > 0

    return (
      // <View style={{ flex: 1 }}>
      //   <Header
      //     onFilterPress={this.handleOpenFilter}
      //     onChartPress={() => history.push(INSIGHTS)}
      //   />
      //   <NetworkStatus />
      //   {
      //     fetchingError && !gearsLoaded
      //       ? this.renderError(fetchingError)
      //       : null
      //   }
      //   {
      //     fetchingGears && !gearsLoaded
      //       ? this.renderLoading()
      //       : null
      //   }
      //   {
      //     gearsLoaded && hasResults
      //       ? this.renderGears()
      //       : null
      //   }
      //   {
      //     !hasResults
      //       ? this.renderNoResults()
      //       : null
      //   }
      //   {
      //     gearsLoaded
      //       ? (
      //         <Searchbar
      //           onChangeText={_.debounce(this.handleSearchBarType, 500)}
      //           placeholder="Gear name"
      //         />
      //       )
      //       : null
      //   }
      //   { this.renderModal() }
      // </View>
      <GearsListPresentational
        fetchingGears={fetchingGears}
        fetchError={fetchingError}
        gears={gears}
        filteredGears={filteredGears}
        onFilterPress={this.handleOpenFilter}
        handleSearchBarType={_.debounce(this.handleSearchBarType, 500)}
        onChartPress={this.handleChartPress}
        roleFilter={roleFilter}
        nameFilter={nameFilter}
        // modal props
        filterOpen={filterOpen}
        characterRoles={characterRoles}
        onApply={this.closeFilterModal}
        onClose={this.handleCloseFilter}
        onPressRole={this.addRoleFilter}
        onTypeCharacterName={this.handleNameFilterType}
        // gear list
        pagerItemsToShow={pagerItemsToShow}
        onSaveGear={this.handleSaveGear}
        savedGears={savedGears}
      />
    )
  }
}

export default connect(R.identity)(GearList)
