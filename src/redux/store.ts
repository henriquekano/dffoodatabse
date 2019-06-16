import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from './reducers'
import { wrapStoreForPersistance } from './persist'
import { appCenterAnalytics } from './middlewares'

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(
    thunkMiddleware,
    appCenterAnalytics,
  )),
)

const persistor = wrapStoreForPersistance(store)
export {
  store,
  persistor,
}
