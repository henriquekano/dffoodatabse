import Analytics from 'appcenter-analytics'
import { Store } from 'redux'
import { Action } from './actions'

const appCenterAnalytics = (store: Store) => (next: (action: Action) => void) => (action: Action) => {
  Analytics.trackEvent(
    `REDUX_${action.type}`,
    {
      role: JSON.stringify(action.role),
      characterNameFilter: JSON.stringify(action.characterNameFilter),
      roleFilter: JSON.stringify(action.roleFilter),
      gearNameFilter: JSON.stringify(action.gearNameFilter),
      limitBreakLevel: JSON.stringify(action.limitBreakLevel),
      character: JSON.stringify(action.character),
      gear: JSON.stringify(action.gear),
      err: JSON.stringify(action.err),
      payload: JSON.stringify(action.payload),
    }
  )
  next(action)
}

export {
  appCenterAnalytics,
}
