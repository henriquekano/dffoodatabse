"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var async_storage_1 = __importDefault(require("@react-native-community/async-storage"));
var redux_persist_1 = require("redux-persist");
var persistConfig = {
    key: 'root',
    storage: async_storage_1.default,
    blacklist: ['viewMode'],
};
var wrapReducerForPersistance = function (reducer) { return redux_persist_1.persistReducer(persistConfig, reducer); };
exports.wrapReducerForPersistance = wrapReducerForPersistance;
var wrapStoreForPersistance = redux_persist_1.persistStore;
exports.wrapStoreForPersistance = wrapStoreForPersistance;
