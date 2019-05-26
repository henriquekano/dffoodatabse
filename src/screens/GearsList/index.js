import React, { PureComponent } from 'react'
import {
  View,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native'
import {
  Text,
} from 'react-native-elements'
import {
  Chip,
  Searchbar,
} from 'react-native-paper'
import { connect } from 'react-redux'
import R from 'ramda'
import {
  GearView,
  NetworkStatus,
  SnappyScrollView,
  ModalFilter,
  Header,
  ScrollWhenHeightChanges,
} from '../../components'
import { store } from '../../redux/store'
import {
  fetchFromDissidiadb,
  saveOwnedGear,
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
        {
          hasFilter
            ? this.renderFilters()
            : null
        }
        <ScrollWhenHeightChanges contentContainerStyle={{ flex: 1 }}>
          <SnappyScrollView
            data={formattedGears}
            itemsPerPage={pagerItemsToShow}
            renderItem={this.renderItem}
          />
        </ScrollWhenHeightChanges>
        <Searchbar
          placeholder="Gear name"
        />
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
