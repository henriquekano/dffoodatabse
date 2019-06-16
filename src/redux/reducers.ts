import {
  GET_GAME_INFORMATION,
  GET_GAME_INFORMATION_FAIL,
  GET_GAME_INFORMATION_SUCCESS,
  SAVE_OWNED_GEAR,
  APPLY_FILTERS,
  TAG_CHARACTER,
  UNTAG_CHARACTER,
  Action,
  FetchAction,
  ErrorAction,
  SaveGearAction,
  ApplyFiltersAction,
  TagCharacterAction,
} from './actions'
import { wrapReducerForPersistance } from './persist'
import StateProps from '../redux/stateTypes'
import { Gear, SavedGear } from '../../types/common'
import { filterGears, addRoleToCharacter, removeRoleFromCharacter } from '../repository'

const R = require('ramda')

const initialState: StateProps = {
  gears: undefined,
  characters: undefined,
  savedGears: [],
  filteredGears: [],
  fetchError: null,
  fetchingGears: false,
  characterRoles: [],
  savedCharacters: {},
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
          gearName: (action as ApplyFiltersAction).gearNameFilter,
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
      return {
        ...state,
        fetchingGears: false,
      }
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
  case TAG_CHARACTER:
    return addRoleToCharacter(
      state,
      (action as TagCharacterAction).role,
      (action as TagCharacterAction).character
    )
  case UNTAG_CHARACTER:
    return removeRoleFromCharacter(
      state,
      (action as TagCharacterAction).role,
      (action as TagCharacterAction).character
    )
  default:
    return state
  }
}

export default wrapReducerForPersistance(reducer)
