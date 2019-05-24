
import AsyncStorage from '@react-native-community/async-storage'
import { persistStore, persistReducer } from 'redux-persist'
import { Reducer } from 'redux'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['viewMode'],
}

const wrapReducerForPersistance = (reducer: Reducer) => persistReducer(persistConfig, reducer)

const wrapStoreForPersistance = persistStore

export {
  wrapReducerForPersistance,
  wrapStoreForPersistance,
}
