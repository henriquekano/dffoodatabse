import * as React from 'react'
import { Fragment } from 'react'
import { View, StyleSheet } from 'react-native'
import { SavedGear, Character, Gear } from '../../../types/common'
import { Grid, YAxis } from 'react-native-svg-charts'
import { Text } from 'react-native-svg'
import * as scale from 'd3-scale'
import { calculateGearDistribuitionByRole, AxisPoint } from '../../repository'

const { BarChart } = require('react-native-svg-charts')

const R = require('ramda')

export interface Props {
  characterRoles: string[],
  savedGears: SavedGear[],
  characters: Character[],
  gears: Gear[],
}

const styles = {
  leftColumn: {
  },
  rightColumn: {
    flex: 1,
  },
}

interface LabelsProps {
  x: (arg: number) => number,
  y: (arg: number) => number,
  bandwidth: number,
  data: any[],
}
const Labels: React.StatelessComponent<LabelsProps> = (
  { x, y, bandwidth, data }: LabelsProps
) => (
  <Fragment>
    {
      data.map((value, index) => (
        <Text
          key={index}
          x={x(value) + 10}
          y={y(index) + (bandwidth / 2)}
          fontSize={14}
          fill="black"
          alignmentBaseline="middle"
        >
          {value}
        </Text>
      ))
    }
  </Fragment>
)

const BarGraph = (props: Props): React.ReactNode => {
  const {
    data,
    maxXAxis,
    yAxis,
  } = calculateGearDistribuitionByRole(props)

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <YAxis
          style={styles.leftColumn}
          yAccessor={({ index }) => index}
          data={yAxis}
          scale={scale.scaleBand}
          svg={{
            fill: 'grey',
            fontSize: 10,
          }}
          numberOfTicks={yAxis.length}
          formatLabel={(_, index) => yAxis[ index ].label}
        />
        <BarChart
          style={[styles.rightColumn, {
            borderLeftWidth: StyleSheet.hairlineWidth,
            borderColor: 'black'
          }]}
          data={R.pluck('value', data)}
          svg={{ fill: 'rgb(134, 65, 244)' }}
          // contentInset={{ righ: 30, left: 30, top: 30, bottom: 30 }}
          animate
          horizontal
          gridMin={0}
          gridMax={maxXAxis}
          numberOfTicks={5}
          animationDuration={3000}
        >
          {/* These values are all not used. The svg-chart makes magic behind the scenes */}
          <Grid
            direction={Grid.Direction.VERTICAL}
          />
          <Labels
            x={() => 1}
            y={() => 1}
            bandwidth={1}
            data={[]}
          />
        </BarChart>
      </View>
    </View>
  )
}

export default BarGraph
