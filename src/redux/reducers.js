"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = require("./actions");
var persist_1 = require("./persist");
var repository_1 = require("../repository");
var R = require('ramda');
var initialState = {
    gears: undefined,
    characters: undefined,
    savedGears: [],
    filteredGears: [],
    filters: {
        role: [],
        characterNameFilter: undefined,
    },
    fetchError: null,
    fetchingGears: false,
    characterRoles: [],
};
var reducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case actions_1.ADD_ROLE_FILTER:
            // filterGears(state)
            return __assign({}, state, { filters: __assign({}, state.filters, { role: R.uniq(state.filters.role.concat([
                        action.role,
                    ])) }) });
        case actions_1.REMOVE_ROLE_FILTER:
            // filterGears(state)
            return __assign({}, state, { filters: __assign({}, state.filters, { role: R.without([action.role], state.filters.role) }) });
        case actions_1.APPLY_FILTERS:
            // filterGears(state)
            return __assign({}, state, { filteredGears: repository_1.filterGears(__assign({}, state, { filters: __assign({}, state.filters, { characterNameFilter: action.characterNameFilter }) })) });
        case actions_1.GET_GAME_INFORMATION:
            return __assign({}, state, { fetchingGears: true });
        case actions_1.GET_GAME_INFORMATION_SUCCESS:
            // eslint-disable-next-line no-case-declarations
            var _a = action.payload, gears = _a.gears, characters = _a.characters, characterRoles = _a.characterRoles;
            // eslint-disable-next-line no-case-declarations
            var gearsDidntChange = (state.gears && state.gears.length)
                === (gears && gears.length);
            if (gearsDidntChange) {
                return state;
            }
            return __assign({}, state, { fetchingGears: false, gears: gears, filteredGears: gears, characters: characters,
                characterRoles: characterRoles });
        case actions_1.GET_GAME_INFORMATION_FAIL:
            return __assign({}, state, { fetchingGears: false, fethingError: action.err });
        case actions_1.SAVE_OWNED_GEAR:
            // eslint-disable-next-line no-case-declarations
            var savedGearMinusTheNewSavedStatus = R.filter(function (_a) {
                var icon = _a.gear.icon;
                return icon !== action.gear.icon;
            });
            var theUserUnsavedTheGear = action.limitBreakLevel < 0;
            if (theUserUnsavedTheGear) {
                return __assign({}, state, { savedGears: savedGearMinusTheNewSavedStatus(state.savedGears).slice() });
            }
            return __assign({}, state, { savedGears: savedGearMinusTheNewSavedStatus(state.savedGears).concat([
                    {
                        gear: action.gear,
                        limitBreakLevel: action.limitBreakLevel,
                    },
                ]) });
        default:
            return state;
    }
};
exports.default = persist_1.wrapReducerForPersistance(reducer);
