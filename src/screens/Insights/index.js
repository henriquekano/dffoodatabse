"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_elements_1 = require("react-native-elements");
var react_redux_1 = require("react-redux");
var ramda_1 = __importDefault(require("ramda"));
var components_1 = require("../../components");
var Insights = /** @class */ (function (_super) {
    __extends(Insights, _super);
    function Insights() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.render = function () {
            var _a = _this.props, history = _a.history, match = _a.match, characters = _a.characters, gears = _a.gears, characterRoles = _a.characterRoles, savedGears = _a.savedGears;
            return (<react_native_1.View style={{ flex: 1 }}>
        <components_1.Header leftComponent={(<react_native_1.TouchableOpacity onPress={function () {
                console.log(match);
                history.goBack();
            }}>
              <react_native_elements_1.Icon name="arrow-back" color="white"/>
            </react_native_1.TouchableOpacity>)}/>
        <components_1.BarGraph characters={characters} gears={gears} roles={characterRoles} savedGears={savedGears}/>
      </react_native_1.View>);
        };
        return _this;
    }
    return Insights;
}(react_1.PureComponent));
exports.default = react_redux_1.connect(ramda_1.default.identity)(Insights);
