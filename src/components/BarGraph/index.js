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
var BarChart = require('react-native-charts-wrapper').BarChart;
var BarGraph = function (props) {
    return (<BarChart style={{
        flex: 1,
    }} data={{
        dataSets: [{
                values: [{ y: 100 }, { y: 105 }, { y: 102 }, { y: 110 }, { y: 114 }, { y: 109 }, { y: 105 }, { y: 99 }, { y: 95 }],
                label: '',
            }],
        config: {
            barWidth: 0.7,
        },
    }} xAxis={{
        valueFormatter: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        granularityEnabled: false,
        granularity: 1,
    }} animation={{ durationX: 1000 }} legend={{
        enabled: false,
        textSize: 14,
        form: 'SQUARE',
        formSize: 14,
        xEntrySpace: 10,
        yEntrySpace: 5,
        formToTextSpace: 5,
        wordWrapEnabled: true,
        maxSizePercent: 0.5
    }} gridBackgroundColor={react_native_1.processColor('#ffffff')} visibleRange={{ x: { min: 8, max: 8 } }} drawBarShadow={false} drawValueAboveBar drawHighlightArrow highlights={[{ x: 3 }, { x: 6 }]}/>);
};
exports.default = BarGraph;
