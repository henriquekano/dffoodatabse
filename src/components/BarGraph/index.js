"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var react_native_1 = require("react-native");
var react_native_svg_charts_1 = require("react-native-svg-charts");
var scale = __importStar(require("d3-scale"));
var styles = {
    leftColumn: {
        flex: 1,
    },
    rightColumn: {
        flex: 9,
    },
};
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
var BarGraph = function (props) {
    var gears = props.gears, roles = props.roles;
    console.log(props);
    var yAxisLabels = [0, 1, 2, 3, 4, 5];
    var yAxisLabelsNames = ['label 1', 'label 2', 'label 3', 'label 4', 'label 5', 'label 6',];
    return (<react_native_1.View style={{ flex: 1, padding: 20 }}>
      <react_native_1.View style={{ flexDirection: 'row' }}>
        <react_native_1.View style={styles.leftColumn}/>
        <react_native_svg_charts_1.XAxis style={styles.rightColumn} data={[1, 2, 3, 4, 5, 6]} 
    // contentInset={{ left: 10, right: 10 }}
    svg={{
        fill: 'grey',
        fontSize: 10,
    }} formatLabel={function (value) { return "" + value; }}/>
      </react_native_1.View>
      <react_native_1.View style={{ flex: 1, flexDirection: 'row' }}>
        <react_native_svg_charts_1.YAxis style={styles.leftColumn} data={yAxisLabels} scale={scale.scaleBand} svg={{
        fill: 'grey',
        fontSize: 10,
    }} numberOfTicks={yAxisLabels.length} formatLabel={function (value) { return "" + yAxisLabelsNames[value]; }}/>
        <react_native_svg_charts_1.BarChart style={styles.rightColumn} data={[50, 10, 40, 95, 85]} svg={{ fill: 'rgb(134, 65, 244)' }} contentInset={{ righ: 30, left: 30, top: 30, bottom: 30 }} animate horizontal animationDuration={2000} numberOfTicks={6}>
          <react_native_svg_charts_1.Grid direction={react_native_svg_charts_1.Grid.Direction.VERTICAL}/>
          
        </react_native_svg_charts_1.BarChart>
      </react_native_1.View>
    </react_native_1.View>);
};
exports.default = BarGraph;
