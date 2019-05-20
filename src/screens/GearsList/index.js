import React, { PureComponent } from 'react'
import {
  View,
  ActivityIndicator,
} from 'react-native'
import {
  Text,
  Button,
} from 'react-native-elements'
import { connect } from 'react-redux'
import { Link, NativeRouterProps } from 'react-router-native'
import R from 'ramda'
import {
  GearView,
  NetworkStatus,
  SnappyScrollView,
  ModalFilter,
  Header,
  BarGraph,
} from '../../components'
import { store } from '../../redux/store'
import {
  fetchFromDissidiadb,
  saveOwnedGear,
  addRoleFilter,
  removeRoleFilter,
  applyFilters,
} from '../../redux/actions'
import { INSIGHTS } from '../../react-router/routes'

class GearList extends PureComponent {
  constructor(props) {
    super(props)
    // gotta save a local state for
    // this is saved in the Storage, which takes sometime
    // and causes the button to respond slowlly
    this.state = {
      filterOpen: false,
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

  handleCloseFilter = () => {
    this.setState({
      filterOpen: false,
    })
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

  renderItem = ({ data, key }) => {
    const { savedGears } = this.props

    const thisGearIcon = data.icon
    const thisGearSavedLimitBreakLevel = R.pipe(
      R.filter(
        R.pathEq(['gear', 'icon'], thisGearIcon),
      ),
      R.head,
      R.propOr(0, 'limitBreakLevel'),
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
    const { filteredGears: gears } = this.props
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
      <SnappyScrollView
        data={formattedGears}
        itemsPerPage={6}
        renderItem={this.renderItem}
      />
    )
  }

  closeFilterModal = () => {
    this.setState(
      {
        filterOpen: false,
      },
      () => store.dispatch(applyFilters()),
    )
  }

  addRoleFilter = (role) => {
    const {
      filters,
    } = this.props
    if (R.contains(role, filters.role)) {
      store.dispatch(removeRoleFilter(role))
    } else {
      store.dispatch(addRoleFilter(role))
    }
  }

  renderModal = () => {
    const {
      filterOpen,
    } = this.state
    const {
      characterRoles,
      filters,
    } = this.props

    return (
      <ModalFilter
        filterOpen={filterOpen}
        characterRoles={characterRoles}
        filters={filters}
        onApply={this.closeFilterModal}
        onClose={this.handleCloseFilter}
        onPressRole={this.addRoleFilter}
      />
    )
  }

  renderSomeGraph = () => {
    const {
      gears,
      characters,
      savedGears,
      characterRoles,
    } = this.props
    return (
      <View style={{ flex: 1 }}>
        <BarGraph
          roles={characterRoles}
          savedGears={savedGears}
          characters={characters}
          gears={gears}
        />
      </View>
    )
  }

  render = () => {
    const {
      fetchingGears,
      fetchingError,
      filteredGears: gears,
      history,
    } = this.props
    const gearsLoaded = gears && gears.length > 0
    return (
      <View style={{ flex: 1 }}>
        <Header
          onFilterPress={this.handleOpenFilter}
          onChartPress={() => history.push(INSIGHTS)}
        />
        <NetworkStatus />
        {
          fetchingError && !gearsLoaded
            ? this.renderError(fetchingError)
            : null
        }
        {
          fetchingGears && !gearsLoaded
            ? this.renderLoading()
            : null
        }
        {
          gearsLoaded
            ? this.renderGears()
            : null
        }
        { this.renderModal() }
      </View>
    )
  }
}

export default connect(R.identity)(GearList)
