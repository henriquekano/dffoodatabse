"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
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
var react_native_elements_1 = require("react-native-elements");
var Header = function (props) {
    var onFilterPress = props.onFilterPress, onChartPress = props.onChartPress, restOfProps = __rest(props, ["onFilterPress", "onChartPress"]);
    return (<react_native_elements_1.Header centerComponent={{ text: 'Dffoo db', style: { color: '#fff' } }} containerStyle={{
        backgroundColor: '#3D6DCC',
        marginTop: ((react_native_1.StatusBar.currentHeight || 0) * -1),
    }} rightComponent={(<react_native_1.View style={{ flexDirection: 'row' }}>
          <react_native_1.TouchableOpacity style={{ backgroundColor: 'orange', paddingVertical: 10, paddingHorizontal: 10 }} onPress={props.onChartPress}>
            <react_native_elements_1.Icon type="material-community" name="lightbulb-on-outline" color="white"/>
          </react_native_1.TouchableOpacity>
          <react_native_1.TouchableOpacity style={{ backgroundColor: 'orange', paddingVertical: 10, paddingHorizontal: 10 }} onPress={props.onFilterPress}>
            <react_native_elements_1.Icon name="filter-list" color="white"/>
          </react_native_1.TouchableOpacity>
        </react_native_1.View>)} {...restOfProps}/>);
};
exports.default = Header;
