import * as React from 'react'
import { processColor, ScrollView, View, Text } from 'react-native'
import { SavedGear, Character, Gear } from '../../../types/common'
import { BarChart, Grid, XAxis, YAxis } from 'react-native-svg-charts'
import * as scale from 'd3-scale'

export interface Props {
  roles: string[],
  savedGears: SavedGear[],
  characters: Character[],
  gears: Gear[],
}

const styles = {
  leftColumn: {
    flex: 1,
  },
  rightColumn: {
    flex: 9,
  },
}

// const CUT_OFF = 50
// const Labels = ({  x, y, bandwidth, data }) => (
//   data.map((value, index) => (
//       <Text
//           key={ index }
//           x={ value > CUT_OFF ? x(0) + 10 : x(value) + 10 }
//           y={ y(index) + (bandwidth / 2) }
//           fontSize={ 14 }
//           fill={ value > CUT_OFF ? 'white' : 'black' }
//           alignmentBaseline={ 'middle' }
//       >
//           {value}
//       </Text>
//   ))
// )

const BarGraph = (props: Props) => {
  const {
    gears,
    roles,
  } = props
  console.log(props)
  const yAxisLabels = [0, 1, 2, 3, 4, 5]
  const yAxisLabelsNames = ['label 1','label 2','label 3','label 4','label 5','label 6',]
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.leftColumn}/>
        <XAxis
          style={styles.rightColumn}
          data={[ 1, 2, 3, 4, 5, 6 ]}
          // contentInset={{ left: 10, right: 10 }}
          svg={{
            fill: 'grey',
            fontSize: 10,
          }}
          formatLabel={ value => `${value}` }
        />
      </View>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <YAxis
          style={styles.leftColumn}
          data={yAxisLabels}
          scale={scale.scaleBand}
          svg={{
            fill: 'grey',
            fontSize: 10,
          }}
          numberOfTicks={yAxisLabels.length}
          formatLabel={(value: number) => `${yAxisLabelsNames[value]}` }
        />
        <BarChart
          style={styles.rightColumn}
          data={[ 50, 10, 40, 95, 85 ]}
          svg={{ fill: 'rgb(134, 65, 244)' }}
          contentInset={{ righ: 30, left: 30, top: 30, bottom: 30 }}
          animate
          horizontal
          animationDuration={2000}
          numberOfTicks={6}
        >
          <Grid
            direction={Grid.Direction.VERTICAL}
          />
          {/* <Labels /> */}
        </BarChart>
      </View>
    </View>
  )
}

export default BarGraph
