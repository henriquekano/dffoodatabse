import * as React from 'react'
import { AppRegistry, StatusBar } from 'react-native'
import { Provider } from 'react-redux'
import { NativeRouter } from 'react-router-native'
import { Provider as PaperProvider, DefaultTheme, Portal } from 'react-native-paper'
import { PersistGate } from 'redux-persist/integration/react'
import codePush from 'react-native-code-push'
import { store, persistor } from './src/redux/store'
import Router from './src/react-navigation/index'
import StorybookUIRoot from './storybook'
import { name as appName } from './app.json'
import { CacheRetrieve } from './src/screens'

const {
  process,
} = global

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3D6DCC',
  },
}

// StatusBar.setHidden(true, null)

// Apply here all the global shit
const Application = () => (
  <Provider store={store}>
    <PersistGate
      loading={(<CacheRetrieve />)}
      persistor={persistor}
    >
      <Portal.Host>
        <PaperProvider theme={theme}>
          <Router />
        </PaperProvider>
      </Portal.Host>
    </PersistGate>
  </Provider>
)

// Storybook...
let RenderingApp = process.env.application === 'storybook'
  ? StorybookUIRoot
  : codePush({
    checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  })(Application)


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

