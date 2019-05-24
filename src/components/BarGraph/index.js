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
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_svg_charts_1 = require("react-native-svg-charts");
var react_native_svg_1 = require("react-native-svg");
var scale = __importStar(require("d3-scale"));
var repository_1 = require("../../repository");
var BarChart = require('react-native-svg-charts').BarChart;
var R = require('ramda');
var styles = {
    leftColumn: {},
    rightColumn: {
        flex: 1,
    },
};
var Labels = function (_a) {
    var x = _a.x, y = _a.y, bandwidth = _a.bandwidth, data = _a.data;
    return (<react_1.Fragment>
    {data.map(function (value, index) { return (<react_native_svg_1.Text key={index} x={x(value) + 10} y={y(index) + (bandwidth / 2)} fontSize={14} fill="black" alignmentBaseline="middle">
          {value}
        </react_native_svg_1.Text>); })}
  </react_1.Fragment>);
};
var BarGraph = function (props) {
    var _a = repository_1.calculateGearDistribuitionByRole(props), data = _a.data, maxXAxis = _a.maxXAxis, yAxis = _a.yAxis;
    return (<react_native_1.View style={{ flex: 1, padding: 20 }}>
      <react_native_1.View style={{ flex: 1, flexDirection: 'row' }}>
        <react_native_svg_charts_1.YAxis style={styles.leftColumn} yAccessor={function (_a) {
        var index = _a.index;
        return index;
    }} data={yAxis} scale={scale.scaleBand} svg={{
        fill: 'grey',
        fontSize: 10,
    }} numberOfTicks={yAxis.length} formatLabel={function (_, index) { return yAxis[index].label; }}/>
        <BarChart style={[styles.rightColumn, {
            borderLeftWidth: react_native_1.StyleSheet.hairlineWidth,
            borderColor: 'black'
        }]} data={R.pluck('value', data)} svg={{ fill: 'rgb(134, 65, 244)' }} 
    // contentInset={{ righ: 30, left: 30, top: 30, bottom: 30 }}
    animate horizontal gridMin={0} gridMax={maxXAxis} numberOfTicks={5} animationDuration={2000}>
          
          <react_native_svg_charts_1.Grid direction={react_native_svg_charts_1.Grid.Direction.VERTICAL}/>
          <Labels x={function () { return 1; }} y={function () { return 1; }} bandwidth={1} data={[]}/>
        </BarChart>
      </react_native_1.View>
    </react_native_1.View>);
};
exports.default = BarGraph;
