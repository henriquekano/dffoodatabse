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
var react_router_native_1 = require("react-router-native");
var react_native_1 = require("react-native");
var screens_1 = require("../screens");
var routes_1 = require("./routes");
var Router = function () { return (<react_router_native_1.NativeRouter>
    <react_router_native_1.BackButton>
      <react_native_1.View style={{ flex: 1 }}>
        <react_router_native_1.Switch>
          <react_router_native_1.Route exact path={routes_1.GEAR_LIST} component={react_router_native_1.withRouter(screens_1.GearList)}/>
          <react_router_native_1.Route exact path={routes_1.INSIGHTS} component={react_router_native_1.withRouter(screens_1.Insights)}/>
        </react_router_native_1.Switch>
      </react_native_1.View>
    </react_router_native_1.BackButton>
  </react_router_native_1.NativeRouter>); };
exports.default = Router;
