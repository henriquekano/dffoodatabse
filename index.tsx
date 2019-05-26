import * as React from 'react'
import { AppRegistry, StatusBar } from 'react-native'
import { Provider } from 'react-redux'
import { NativeRouter } from 'react-router-native'
import { Provider as PaperProvider } from 'react-native-paper'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './src/redux/store'
import Router from './src/react-router/router'
import StorybookUIRoot from './storybook'
import { name as appName } from './app.json'
import { CacheRetrieve, GearList } from './src/screens'

const {
  process,
} = global

// StatusBar.setHidden(true, null)

// Apply here all the global shit
const Application = () => (
  <Provider store={store}>
    <PersistGate
      loading={(<CacheRetrieve />)}
      persistor={persistor}
    >
      <PaperProvider>
        <Router />
      </PaperProvider>
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

