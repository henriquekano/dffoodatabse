import React, { PureComponent, Fragment } from 'react'
import { View } from 'react-native'
import ViewPager from '@react-native-community/viewpager'
import { Text } from 'react-native-elements'
import R from 'ramda'
import PropTypes from 'prop-types'

const styles = {

}

class SnappyScrollView extends PureComponent {
  constructor(props) {
    super(props)
    this.paginatedData = this.splitPageData()
    this.renderedCells = 3
    this.state = {
      pagesData: this.nullNonVisible(0),
      currentPage: 0,
    }
  }

  componentWillReceiveProps(nextProps) {
    const { data: currentData, itemsPerPage } = this.props
    const { data, itemsPerPage: nextItemsPerPage } = nextProps
    const dataChanged = currentData
      && data
      && currentData.length !== data.length
      || itemsPerPage !== nextItemsPerPage

    if (dataChanged) {
      this.paginatedData = R.splitEvery(nextItemsPerPage)(data)
      this.setState({
        pagesData: this.nullNonVisible(0),
        currentPage: 0,
      }, () => this.pagerRef.setPage(0))
    }
  }

  nullNonVisible = (page) => {
    const renderLength = Math.floor(this.renderedCells / 2)
    const calculated = this.paginatedData.map((value, index) => {
      if (index <= page - renderLength - 1) {
        return null
      }

      if (index >= page + renderLength + 1) {
        return null
      }

      return value
    })
    return calculated
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
    const { renderItem, itemsPerPage } = this.props
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
                  style={{ flexDirection: 'row', height: `${100 / (itemsPerPage / 2)}%` }}
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
          style={{ flex: 1 }}
          initialPage={0}
          onPageSelected={this.calculateNewPages}
        >
          {
            pagesData.map(this.renderPage)
          }
        </ViewPager>
        <View>
          <Text style={{ flexDirection: 'row', alignSelf: 'center', fontWeight: 'bold' }}>
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
