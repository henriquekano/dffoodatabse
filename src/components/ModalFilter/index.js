"use strict";
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
var react_native_1 = require("react-native");
var react_native_elements_1 = require("react-native-elements");
var ramda_1 = __importDefault(require("ramda"));
var ModalFilter = function (props) {
    var filterOpen = props.filterOpen, characterRoles = props.characterRoles, rolesFilter = props.filters.role, onPressRole = props.onPressRole, onApply = props.onApply, onClose = props.onClose;
    var chipSelectedStyle = {
        backgroundColor: '#3D6DCC',
    };
    var chipSelectedTextStyle = {
        color: 'white',
    };
    return (<react_native_1.Modal animationType="fade" visible={filterOpen} hardwareAccelerated>
      <react_native_1.View style={{ flex: 1 }}>
        <react_native_1.TouchableOpacity style={{ paddingVertical: 5 }} onPress={onClose}>
          <react_native_elements_1.Icon name="close" color="black"/>
        </react_native_1.TouchableOpacity>
        <react_native_1.View style={{ flexDirection: 'row', backgroundColor: '#3D6DCC', padding: 10 }}>
          <react_native_elements_1.Text style={{ color: 'white' }}>Character Name</react_native_elements_1.Text>
        </react_native_1.View>
        <react_native_elements_1.Input style={{ marginBottom: 10 }} placeholder="Marche"/>
        <react_native_1.View style={{ flexDirection: 'row', backgroundColor: '#3D6DCC', padding: 10 }}>
          <react_native_elements_1.Text style={{ color: 'white' }}>Character Role</react_native_elements_1.Text>
        </react_native_1.View>
        <react_native_1.View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
          {characterRoles.map(function (role) { return (<react_native_1.TouchableOpacity onPress={function () { return onPressRole(role); }} key={role} style={[
        ramda_1.default.contains(role, rolesFilter) ? chipSelectedStyle : null,
        { paddingHorizontal: 6, paddingVertical: 4, margin: 5, borderWidth: 1, borderColor: 'grey', borderRadius: 20 }
    ]}>
                <react_native_elements_1.Text style={ramda_1.default.contains(role, rolesFilter) ? chipSelectedTextStyle : null}>
                  {role}
                </react_native_elements_1.Text>
              </react_native_1.TouchableOpacity>); })}
        </react_native_1.View>
        <react_native_elements_1.Button title="APPLY" containerStyle={{
        padding: 10
    }} buttonStyle={{
        backgroundColor: '#3D6DCC'
    }} onPress={onApply}/>
      </react_native_1.View>
    </react_native_1.Modal>);
};
exports.default = ModalFilter;
