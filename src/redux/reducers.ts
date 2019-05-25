import {
  GET_GAME_INFORMATION,
  GET_GAME_INFORMATION_FAIL,
  GET_GAME_INFORMATION_SUCCESS,
  SAVE_OWNED_GEAR,
  APPLY_FILTERS,
  Action,
  FetchAction,
  ErrorAction,
  SaveGearAction,
  ApplyFiltersAction,
} from './actions'
import { wrapReducerForPersistance } from './persist'
import StateProps from '../redux/stateTypes'
import { Gear, SavedGear } from '../../types/common'
import { filterGears } from '../repository'

const R = require('ramda')

const initialState: StateProps = {
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
}

const reducer = (state: StateProps = initialState, action: Action) => {
  switch (action.type) {
  case APPLY_FILTERS:
    // filterGears(state)
    return {
      ...state,
      filteredGears: filterGears({
        ...state,
        filters: {
          role: (action as ApplyFiltersAction).roleFilter,
          characterNameFilter: (action as ApplyFiltersAction).characterNameFilter,
        }
      }),
    }
  case GET_GAME_INFORMATION:
    return {
      ...state,
      fetchingGears: true,
    }
  case GET_GAME_INFORMATION_SUCCESS:
    // eslint-disable-next-line no-case-declarations
    const {
      gears,
      characters,
      characterRoles,
    } = (action as FetchAction).payload
    // eslint-disable-next-line no-case-declarations
    const gearsDidntChange = (state.gears && state.gears.length)
      === (gears && gears.length)
    if (gearsDidntChange) {
      return state
    }
    return {
      ...state,
      fetchingGears: false,
      gears,
      filteredGears: gears,
      characters,
      characterRoles,
    }
  case GET_GAME_INFORMATION_FAIL:
    return {
      ...state,
      fetchingGears: false,
      fethingError: (action as ErrorAction).err,
    }
  case SAVE_OWNED_GEAR:
    // eslint-disable-next-line no-case-declarations
    const savedGearMinusTheNewSavedStatus: (gears: SavedGear[]) => SavedGear[] =
      R.filter(
        ({ gear: { icon } }: SavedGear) => icon !== (action as SaveGearAction).gear.icon,
      )

    const theUserUnsavedTheGear = (action as SaveGearAction).limitBreakLevel < 0
    if (theUserUnsavedTheGear) {
      return {
        ...state,
        savedGears: [
          ...savedGearMinusTheNewSavedStatus(state.savedGears),
        ],
      }
    }
    return {
      ...state,
      savedGears: [
        ...savedGearMinusTheNewSavedStatus(state.savedGears),
        {
          gear: (action as SaveGearAction).gear,
          limitBreakLevel: (action as SaveGearAction).limitBreakLevel,
        },
      ],
    }
  default:
    return state
  }
}

export default wrapReducerForPersistance(reducer)
