import {
  GET_GAME_INFORMATION,
  GET_GAME_INFORMATION_FAIL,
  GET_GAME_INFORMATION_SUCCESS,
  GET_BANNER_INFORMATION,
  GET_BANNER_INFORMATION_SUCCESS,
  GET_BANNER_INFORMATION_FAIL,
  SAVE_OWNED_GEAR,
  APPLY_FILTERS,
  TAG_CHARACTER,
  UNTAG_CHARACTER,
  Action,
  DffooDbFetchAction,
  ErrorAction,
  SaveGearAction,
  ApplyFiltersAction,
  TagCharacterAction,
  AltemaFetchAction,
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
  // banner stuff
  fetchingBanners: false,
  fetchingBannersError: null,
  banners: undefined,
  naturalPassiveAbilities: [],
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
      naturalPassiveAbilities,
    } = (action as DffooDbFetchAction).payload
    return {
      ...state,
      fetchingGears: false,
      gears,
      filteredGears: gears,
      characters,
      characterRoles,
      naturalPassiveAbilities,
    }
  case GET_GAME_INFORMATION_FAIL:
    return {
      ...state,
      fetchingGears: false,
      fethingError: (action as ErrorAction).err,
    }
  case GET_BANNER_INFORMATION:
    return {
      ...state,
      fetchingBanners: true,
      fetchingBannersError: null,
    }
  case GET_BANNER_INFORMATION_SUCCESS:
    return {
      ...state,
      fetchingBanners: false,
      banners: (action as AltemaFetchAction).payload.banners,
    }
  case GET_BANNER_INFORMATION_FAIL:
    return {
      ...state,
      fetchingBanners: false,
      fetchingBannersError: (action as ErrorAction).err,
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
