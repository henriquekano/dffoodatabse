import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import R from 'ramda'
import _ from 'lodash'
import { store } from '../../redux/store.ts'
import {
  fetchFromDissidiadb,
  saveOwnedGear,
  applyFilters,
} from '../../redux/actions.ts'
import { INSIGHTS, CHARACTERS } from '../../react-router/routes'
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

  handleCharacterPress = () => {
    const { history } = this.props
    history.push(CHARACTERS)
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

  render = () => {
    const {
      fetchingGears,
      fetchingError,
      gears,
      filteredGears,
      characterRoles,
      savedGears,
    } = this.props
    const {
      filterOpen,
      nameFilter,
      pagerItemsToShow,
      roleFilter,
    } = this.state

    return (
      <GearsListPresentational
        fetchingGears={fetchingGears}
        fetchError={fetchingError}
        gears={gears}
        filteredGears={filteredGears}
        onFilterPress={this.handleOpenFilter}
        handleSearchBarType={_.debounce(this.handleSearchBarType, 500)}
        onChartPress={this.handleChartPress}
        onCharacterPress={this.handleCharacterPress}
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
