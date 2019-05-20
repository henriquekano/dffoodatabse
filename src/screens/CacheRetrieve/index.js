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
var react_native_elements_1 = require("react-native-elements");
var CacheRetrieve = function () { return (<react_native_1.View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <react_native_1.ActivityIndicator size="large"/>
    <react_native_elements_1.Text>Retrieving cache</react_native_elements_1.Text>
  </react_native_1.View>); };
exports.default = CacheRetrieve;
