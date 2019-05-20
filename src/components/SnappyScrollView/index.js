import React, { PureComponent, Fragment } from 'react'
import { View } from 'react-native'
import ViewPager from '@react-native-community/viewpager'
import { Text } from 'react-native-elements'
import R from 'ramda'
import PropTypes from 'prop-types'

class SnappyScrollView extends PureComponent {
  constructor(props) {
    super(props)
    this.paginatedData = this.splitPageData()
    this.renderedCells = 7
    this.state = {
      pagesData: this.nullNonVisible(0),
      currentPage: 0,
    }
  }

  componentWillReceiveProps(nextProps) {
    const { data: currentData } = this.props
    const { data, itemsPerPage } = nextProps
    const dataChanged = currentData && data && currentData.length !== data.length

    if (dataChanged) {
      this.paginatedData = R.splitEvery(itemsPerPage)(data)
      this.setState({
        pagesData: this.nullNonVisible(0),
        currentPage: 0,
      }, () => this.pagerRef.setPage(0))
    }
  }

  nullNonVisible = (page) => {
    // quantas celulas devem ter dados reais pra direita / esquerda
    const renderLength = Math.floor(this.renderedCells / 2)
    let arrayBegin = page - renderLength
    if (arrayBegin < 0) {
      arrayBegin = 0
    }
    const visible = R.slice(arrayBegin, page + renderLength + 1, this.paginatedData)

    let numberOfElementsBefore = 0
    const distanceToLeftBorder = page
    if (page >= renderLength + 1) {
      numberOfElementsBefore = page - renderLength
    }
    const before = R.repeat(null, numberOfElementsBefore)

    let numberOfElementsAfter = this.paginatedData.length - (renderLength * 2 + 1) - numberOfElementsBefore
    const distanceToRightBorder = this.paginatedData.length - (page + 1)
    const pageTooCloseToRightBorder = distanceToRightBorder <= renderLength
    const visibleGroupTouchesLeftBorder = distanceToLeftBorder < renderLength
    if (pageTooCloseToRightBorder) {
      numberOfElementsAfter = 0
    } else if (visibleGroupTouchesLeftBorder) {
      numberOfElementsAfter += renderLength - page
    }
    const after = R.repeat(null, numberOfElementsAfter)

    return [...before, ...visible, ...after]
  }

  splitPageData = () => {
    const { data, itemsPerPage } = this.props
    return R.splitEvery(itemsPerPage)(data)
  }

  calculateNewPages = (event) => {
    const nextPage = event.nativeEvent.position
    this.setState({
      pagesData: this.nullNonVisible(nextPage),
      currentPage: nextPage,
    })
  }

  renderPage = (currentPageData, keyComplement) => {
    const { renderItem } = this.props
    const numberOfColumns = 2
    const columnizedData = currentPageData && R.splitEvery(numberOfColumns, currentPageData)
    return (
      <View
        key={`SnappyScrollView-renderPage-${keyComplement}`}
        style={{ width: '100%', height: '100%' }}
      >
        {
          columnizedData
            ? (
              columnizedData.map(column => (
                <View
                  style={{ flex: 1, flexDirection: 'row' }}
                  key={`SnappyScrollView-renderPage-currentPageData.map-${JSON.stringify(column)}`}
                >
                  {
                    column.length === 2 // fills a full row?
                      ? column.map(data => renderItem(data))
                      : (
                        <Fragment>
                          {renderItem(column[0])}
                          <View style={{ flex: 1 }} />
                        </Fragment>
                      )
                  }
                </View>
              ))
            )
            : null
        }
      </View>
    )
  }

  render = () => {
    const { pagesData, currentPage } = this.state
    return (
      <View style={{ flex: 1 }}>
        <ViewPager
          ref={(pagerRef) => { this.pagerRef = pagerRef }}
          style={{ flex: 20 }}
          initialPage={0}
          onPageSelected={this.calculateNewPages}
        >
          {
            pagesData.map(this.renderPage)
          }
        </ViewPager>
        <View style={{ flex: 1 }}>
          <Text style={{ flex: 1, flexDirection: 'row', alignSelf: 'center', fontWeight: 'bold' }}>
            {`<${currentPage + 1} / ${pagesData.length}>`}
          </Text>
        </View>
      </View>
    )
  }
}

SnappyScrollView.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  renderItem: PropTypes.func.isRequired,
}

export default SnappyScrollView
