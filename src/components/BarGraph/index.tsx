import * as React from 'react'
import { processColor } from 'react-native'
import { SavedGear, Character, Gear } from '../../redux/stateTypes'

const { BarChart } = require('react-native-charts-wrapper')

export interface Props {
  roles: string[],
  savedGears: SavedGear[],
  characters: Character[],
  gears: Gear[],
}

const BarGraph = (props: Props) => {
  return (
    <BarChart
      style={{
        flex: 1,
      }}
      data={{
        dataSets: [{
          values: [{y: 100}, {y: 105}, {y: 102}, {y: 110}, {y: 114}, {y: 109}, {y: 105}, {y: 99}, {y: 95}],
          label: '',
        }],
        config: {
          barWidth: 0.7,
        },
      }}
      xAxis={{
        valueFormatter: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        granularityEnabled: false,
        granularity: 1,
      }}
      animation={{durationX: 1000}}
      legend={{
        enabled: false,
        textSize: 14,
        form: 'SQUARE',
        formSize: 14,
        xEntrySpace: 10,
        yEntrySpace: 5,
        formToTextSpace: 5,
        wordWrapEnabled: true,
        maxSizePercent: 0.5
      }}
      gridBackgroundColor={processColor('#ffffff')}
      visibleRange={{x: { min: 8, max: 8 }}}
      drawBarShadow={false}
      drawValueAboveBar
      drawHighlightArrow
      highlights={[{x: 3}, {x: 6}]}
    />
  )
}

export default BarGraph
