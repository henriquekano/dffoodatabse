import { Dispatch } from 'redux'
import { Gear } from '../../types/common'
import { parse, Parsed } from '../scrapper/parser'

const GET_GAME_INFORMATION = 'GET_GAME_INFORMATION'
const GET_GAME_INFORMATION_SUCCESS = 'GET_GAME_INFORMATION_SUCCESS'
const GET_GAME_INFORMATION_FAIL = 'GET_GAME_INFORMATION_FAIL'
const SAVE_OWNED_GEAR = 'SAVE_OWNED_GEAR'
const CHANGE_GEAR_VIEW_MODE = 'CHANGE_GEAR_VIEW_MODE'
const ADD_ROLE_FILTER = 'ADD_ROLE_FILTER'
const REMOVE_ROLE_FILTER = 'REMOVE_ROLE_FILTER'
const APPLY_FILTERS = 'APPLY_FILTERS'
const ADD_NAME_FILTER = 'ADD_NAME_FILTER'

export type ActionType = 'GET_GAME_INFORMATION'
  | 'GET_GAME_INFORMATION'
  | 'GET_GAME_INFORMATION_FAIL'
  | 'GET_GAME_INFORMATION_SUCCESS'
  | 'SAVE_OWNED_GEAR'
  | 'CHANGE_GEAR_VIEW_MODE'
  | 'ADD_ROLE_FILTER'
  | 'REMOVE_ROLE_FILTER'
  | 'APPLY_FILTERS'
  | 'ADD_NAME_FILTER'

export interface BaseAction {
  type: ActionType
}

export interface RoleAction extends BaseAction {
  role: string,
}

export interface ApplyFiltersAction extends BaseAction {
  characterNameFilter: string,
}

export interface FetchAction extends BaseAction {
  payload: Parsed,
}

export interface ErrorAction extends BaseAction {
  err: any,
}

export interface SaveGearAction extends BaseAction {
  limitBreakLevel: number,
  gear: Gear,
}

export type Action = BaseAction | RoleAction | FetchAction | ErrorAction | SaveGearAction

const applyFilters = ({ characterNameFilter }: { characterNameFilter: string }): ApplyFiltersAction => ({
  type: APPLY_FILTERS,
  characterNameFilter,
})

const addRoleFilter = (role: string): RoleAction => ({
  type: ADD_ROLE_FILTER,
  role,
})

const removeRoleFilter = (role: string): RoleAction => ({
  type: REMOVE_ROLE_FILTER,
  role,
})

const getGameInformation = (): BaseAction => ({
  type: GET_GAME_INFORMATION,
})

const getGameInformationSuccess = (payload: Parsed): FetchAction => ({
  type: GET_GAME_INFORMATION_SUCCESS,
  payload,
})

const getGameInformationFail = (err: any): ErrorAction => ({
  type: GET_GAME_INFORMATION_FAIL,
  err,
})

const saveOwnedGear =
  (
    { limitBreakLevel, gear }:
    { limitBreakLevel: number, gear: Gear }
  ): SaveGearAction => ({
    type: SAVE_OWNED_GEAR,
    limitBreakLevel,
    gear,
  })

const fetchFromDissidiadb = () => (dispatch: Dispatch) => {
  dispatch(getGameInformation())
  return fetch('https://dissidiadb.com/static/js/app.1432605e692499762dfa.js')
    .then(response => response.text())
    .then(
      responseTextBody =>
        dispatch(getGameInformationSuccess(parse(responseTextBody))),
      err =>
        dispatch(getGameInformationFail(err)),
    )
    .catch(err => dispatch(getGameInformationFail(err)))
}

export {
  getGameInformation,
  saveOwnedGear,
  fetchFromDissidiadb,
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
