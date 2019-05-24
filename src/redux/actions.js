"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var parser_1 = require("../scrapper/parser");
var GET_GAME_INFORMATION = 'GET_GAME_INFORMATION';
exports.GET_GAME_INFORMATION = GET_GAME_INFORMATION;
var GET_GAME_INFORMATION_SUCCESS = 'GET_GAME_INFORMATION_SUCCESS';
exports.GET_GAME_INFORMATION_SUCCESS = GET_GAME_INFORMATION_SUCCESS;
var GET_GAME_INFORMATION_FAIL = 'GET_GAME_INFORMATION_FAIL';
exports.GET_GAME_INFORMATION_FAIL = GET_GAME_INFORMATION_FAIL;
var SAVE_OWNED_GEAR = 'SAVE_OWNED_GEAR';
exports.SAVE_OWNED_GEAR = SAVE_OWNED_GEAR;
var CHANGE_GEAR_VIEW_MODE = 'CHANGE_GEAR_VIEW_MODE';
exports.CHANGE_GEAR_VIEW_MODE = CHANGE_GEAR_VIEW_MODE;
var ADD_ROLE_FILTER = 'ADD_ROLE_FILTER';
exports.ADD_ROLE_FILTER = ADD_ROLE_FILTER;
var REMOVE_ROLE_FILTER = 'REMOVE_ROLE_FILTER';
exports.REMOVE_ROLE_FILTER = REMOVE_ROLE_FILTER;
var APPLY_FILTERS = 'APPLY_FILTERS';
exports.APPLY_FILTERS = APPLY_FILTERS;
var ADD_NAME_FILTER = 'ADD_NAME_FILTER';
var applyFilters = function (_a) {
    var characterNameFilter = _a.characterNameFilter;
    return ({
        type: APPLY_FILTERS,
        characterNameFilter: characterNameFilter,
    });
};
exports.applyFilters = applyFilters;
var addRoleFilter = function (role) { return ({
    type: ADD_ROLE_FILTER,
    role: role,
}); };
exports.addRoleFilter = addRoleFilter;
var removeRoleFilter = function (role) { return ({
    type: REMOVE_ROLE_FILTER,
    role: role,
}); };
exports.removeRoleFilter = removeRoleFilter;
var getGameInformation = function () { return ({
    type: GET_GAME_INFORMATION,
}); };
exports.getGameInformation = getGameInformation;
var getGameInformationSuccess = function (payload) { return ({
    type: GET_GAME_INFORMATION_SUCCESS,
    payload: payload,
}); };
var getGameInformationFail = function (err) { return ({
    type: GET_GAME_INFORMATION_FAIL,
    err: err,
}); };
var saveOwnedGear = function (_a) {
    var limitBreakLevel = _a.limitBreakLevel, gear = _a.gear;
    return ({
        type: SAVE_OWNED_GEAR,
        limitBreakLevel: limitBreakLevel,
        gear: gear,
    });
};
exports.saveOwnedGear = saveOwnedGear;
var fetchFromDissidiadb = function () { return function (dispatch) {
    dispatch(getGameInformation());
    return fetch('https://dissidiadb.com/static/js/app.1432605e692499762dfa.js')
        .then(function (response) { return response.text(); })
        .then(function (responseTextBody) {
        return dispatch(getGameInformationSuccess(parser_1.parse(responseTextBody)));
    }, function (err) {
        return dispatch(getGameInformationFail(err));
    })
        .catch(function (err) { return dispatch(getGameInformationFail(err)); });
}; };
exports.fetchFromDissidiadb = fetchFromDissidiadb;
