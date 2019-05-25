import { Dispatch } from 'redux'
import { Gear } from '../../types/common'
import { parse, Parsed } from '../scrapper/parser'

const GET_GAME_INFORMATION = 'GET_GAME_INFORMATION'
const GET_GAME_INFORMATION_SUCCESS = 'GET_GAME_INFORMATION_SUCCESS'
const GET_GAME_INFORMATION_FAIL = 'GET_GAME_INFORMATION_FAIL'
const SAVE_OWNED_GEAR = 'SAVE_OWNED_GEAR'
const APPLY_FILTERS = 'APPLY_FILTERS'
const ADD_NAME_FILTER = 'ADD_NAME_FILTER'

export type ActionType = 'GET_GAME_INFORMATION'
  | 'GET_GAME_INFORMATION'
  | 'GET_GAME_INFORMATION_FAIL'
  | 'GET_GAME_INFORMATION_SUCCESS'
  | 'SAVE_OWNED_GEAR'
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
  roleFilter: string[],
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

const applyFilters = (
  { characterNameFilter, roleFilter }: { characterNameFilter: string, roleFilter: string[] }
): ApplyFiltersAction => ({
  type: APPLY_FILTERS,
  characterNameFilter,
  roleFilter,
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
  applyFilters,
  GET_GAME_INFORMATION,
  GET_GAME_INFORMATION_FAIL,
  GET_GAME_INFORMATION_SUCCESS,
  SAVE_OWNED_GEAR,
  APPLY_FILTERS,
}
