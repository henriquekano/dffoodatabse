import R from 'ramda'
import {
  GET_GAME_INFORMATION,
  GET_GAME_INFORMATION_FAIL,
  GET_GAME_INFORMATION_SUCCESS,
  CHANGE_GEAR_VIEW_MODE,
  SAVE_OWNED_GEAR,
  ADD_ROLE_FILTER,
  REMOVE_ROLE_FILTER,
  APPLY_FILTERS,
} from './actions'
import { wrapReducerForPersistance } from './persist'

const initialState = {
  gears: null,
  characters: null,
  savedGears: [],
  filteredGears: [],
  filters: {
    role: [],
    name: null,
  },
  viewMode: 'BY_CHARACTER',
  fetchError: null,
  fetchingGears: false,
  characterRoles: [],
}

const filterGears = (state) => {
  const {
    characters,
    filters: { role: roleFilters },
    gears,
  } = state

  if (!roleFilters || roleFilters.length <= 0) {
    return gears
  }
  const charactersIntersectionsWithTheFilter = R.pipe(
    R.map(
      R.applySpec({
        name: R.prop('slug'),
        rolesIntersection: R.pipe(
          R.path(['profile', 'traits', 'role']),
          R.intersection(
            roleFilters,
          ),
        ),
      }),
    ),
    R.filter(
      R.pipe(
        R.prop('rolesIntersection'),
        R.length,
        R.equals(roleFilters.length),
      ),
    ),
    R.pluck('name'),
  )(characters)

  const filteredGears = R.filter(
    R.pipe(
      R.path(['character', 'name']),
      // eslint-disable-next-line no-underscore-dangle
      R.contains(R.__, charactersIntersectionsWithTheFilter),
    ),
  )(gears)

  return filteredGears
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case ADD_ROLE_FILTER:
    // filterGears(state)
    return {
      ...state,
      filters: {
        ...state.filters,
        role: R.uniq([
          ...state.filters.role,
          action.role,
        ]),
      },
    }
  case REMOVE_ROLE_FILTER:
    // filterGears(state)
    return {
      ...state,
      filters: {
        ...state.filters,
        role: R.without(
          [action.role],
          state.filters.role,
        ),
      },
    }
  case APPLY_FILTERS:
    // filterGears(state)
    return {
      ...state,
      filteredGears: filterGears(state),
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
    } = action.payload
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
      fethingError: action.err,
    }
  case CHANGE_GEAR_VIEW_MODE:
    return {
      ...state,
      viewMode: action.mode,
    }
  case SAVE_OWNED_GEAR:
    // eslint-disable-next-line no-case-declarations
    const savedGearMinusTheNewSavedStatus = R.filter(
      ({ gear: { icon } }) => icon !== action.gear.icon,
    )
    return {
      ...state,
      savedGears: [
        ...savedGearMinusTheNewSavedStatus(state.savedGears),
        {
          gear: action.gear,
          limitBreakLevel: action.limitBreakLevel,
        },
      ],
    }
  default:
    return state
  }
}

export default wrapReducerForPersistance(reducer)
