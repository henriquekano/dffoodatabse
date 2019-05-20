import { parse } from '../scrapper/parser'

const GET_GAME_INFORMATION = 'GET_GAME_INFORMATION'
const GET_GAME_INFORMATION_SUCCESS = 'GET_GAME_INFORMATION_SUCCESS'
const GET_GAME_INFORMATION_FAIL = 'GET_GAME_INFORMATION_FAIL'
const SAVE_OWNED_GEAR = 'SAVE_OWNED_GEAR'
const CHANGE_GEAR_VIEW_MODE = 'CHANGE_GEAR_VIEW_MODE'
const ADD_ROLE_FILTER = 'ADD_ROLE_FILTER'
const REMOVE_ROLE_FILTER = 'REMOVE_ROLE_FILTER'
const APPLY_FILTERS = 'APPLY_FILTERS'

const applyFilters = () => ({
  type: APPLY_FILTERS,
})

const addRoleFilter = role => ({
  type: ADD_ROLE_FILTER,
  role,
})

const removeRoleFilter = role => ({
  type: REMOVE_ROLE_FILTER,
  role,
})

const getGameInformation = () => ({
  type: GET_GAME_INFORMATION,
})

const getGameInformationSuccess = payload => ({
  type: GET_GAME_INFORMATION_SUCCESS,
  payload,
})

const getGameInformationFail = err => ({
  type: GET_GAME_INFORMATION_FAIL,
  err,
})

const saveOwnedGear = ({ limitBreakLevel, gear }) => ({
  type: SAVE_OWNED_GEAR,
  limitBreakLevel,
  gear,
})

const changeGearViewMode = mode => ({
  type: CHANGE_GEAR_VIEW_MODE,
  mode,
})

const fetchFromDissidiadb = () => (dispatch) => {
  dispatch(getGameInformation())
  return fetch('https://dissidiadb.com/static/js/app.1432605e692499762dfa.js')
    .then(response => response.text())
    .then(
      responseTextBody => Promise.resolve(
        parse(responseTextBody),
      ),
      err => dispatch(getGameInformationFail(err)),
    )
    .then(parsed => dispatch(getGameInformationSuccess(parsed)))
    .catch(err => dispatch(getGameInformationFail(err)))
}

export {
  getGameInformation,
  saveOwnedGear,
  fetchFromDissidiadb,
  changeGearViewMode,
  addRoleFilter,
  removeRoleFilter,
  applyFilters,
  GET_GAME_INFORMATION,
  GET_GAME_INFORMATION_FAIL,
  GET_GAME_INFORMATION_SUCCESS,
  SAVE_OWNED_GEAR,
  CHANGE_GEAR_VIEW_MODE,
  ADD_ROLE_FILTER,
  REMOVE_ROLE_FILTER,
  APPLY_FILTERS,
}
