import * as React from 'react'
import { AppRegistry, ActivityIndicator, View } from 'react-native'
import { Provider } from 'react-redux'
import { NativeRouter } from 'react-router-native'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './src/redux/store'
import Router from './src/react-router/router'
import StorybookUIRoot from './storybook'
import App from './App'
import { name as appName } from './app.json'
import { CacheRetrieve, GearList } from './src/screens'

const {
  process,
} = global

// Apply here all the global shit
const Application = () => (
  <Provider store={store}>
    <PersistGate
      loading={(<CacheRetrieve />)}
      persistor={persistor}
    >
      <Router />
    </PersistGate>
  </Provider>
)

// Storybook...
let RenderingApp = process.env.application === 'storybook'
  ? StorybookUIRoot
  : Application


// eslint-disable-next-line no-undef
if (__DEV__) {
  // eslint-disable-next-line global-require
  const { DevDrawer } = require('./src/components')
  const OriginalApp = RenderingApp
  RenderingApp = () => (
    <DevDrawer>
      <OriginalApp/>
    </DevDrawer>
  )
}

AppRegistry.registerComponent(appName, () => RenderingApp)

