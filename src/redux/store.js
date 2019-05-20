import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger'
import reducer from './reducers'
import { wrapStoreForPersistance } from './persist'

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(
    thunkMiddleware,
    // logger,
  )),
)

const persistor = wrapStoreForPersistance(store)
export {
  store,
  persistor,
}
