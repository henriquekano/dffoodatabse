import { Dispatch } from 'redux'
import { Gear, Character } from '../../types/common'
import { parse, Parsed } from '../scrapper/parser'

const GET_GAME_INFORMATION = 'GET_GAME_INFORMATION'
const GET_GAME_INFORMATION_SUCCESS = 'GET_GAME_INFORMATION_SUCCESS'
const GET_GAME_INFORMATION_FAIL = 'GET_GAME_INFORMATION_FAIL'
const SAVE_OWNED_GEAR = 'SAVE_OWNED_GEAR'
const APPLY_FILTERS = 'APPLY_FILTERS'
const ADD_NAME_FILTER = 'ADD_NAME_FILTER'
const TAG_CHARACTER = 'TAG_CHARACTER'
const UNTAG_CHARACTER = 'UNTAG_CHARACTER'

export type ActionType = 'GET_GAME_INFORMATION'
  | 'GET_GAME_INFORMATION'
  | 'GET_GAME_INFORMATION_FAIL'
  | 'GET_GAME_INFORMATION_SUCCESS'
  | 'SAVE_OWNED_GEAR'
  | 'APPLY_FILTERS'
  | 'ADD_NAME_FILTER'
  | 'TAG_CHARACTER'
  | 'UNTAG_CHARACTER'

export interface BaseAction {
  type: ActionType
}

export interface RoleAction extends BaseAction {
  role: string,
}

export interface ApplyFiltersAction extends BaseAction {
  characterNameFilter: string,
  roleFilter: string[],
  gearNameFilter: string,
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

export interface TagCharacterAction extends BaseAction {
  role: string,
  character: Character,
}

export type Action = BaseAction | RoleAction | FetchAction | ErrorAction | SaveGearAction

export interface ApplyFilterArgs {
  characterNameFilter: string,
  roleFilter: string[],
  gearNameFilter: string,
}
const applyFilters = (
  { characterNameFilter, roleFilter, gearNameFilter }: ApplyFilterArgs
): ApplyFiltersAction => ({
  type: APPLY_FILTERS,
  characterNameFilter,
  roleFilter,
  gearNameFilter,
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

const tagCharacter = (role: string, character: Character): TagCharacterAction => ({
  type: TAG_CHARACTER,
  role,
  character,
})

const untagCharacter = (role: string, character: Character): TagCharacterAction => ({
  type: UNTAG_CHARACTER,
  role,
  character,
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

const fetchFromDissidiadb = () => async (dispatch: Dispatch) => {
  dispatch(getGameInformation())
  try {
    const mainPageResponse = await fetch('https://dissidiadb.com')
    const mainPageHtml = await mainPageResponse.text()
    const appJsEndpointMatches = mainPageHtml.match(/\/static\/js\/app[^>]+/)
    if (appJsEndpointMatches && appJsEndpointMatches.length > 0) {
      const appJsEndpoint = appJsEndpointMatches[0]
      console.log(appJsEndpoint)
      const jsResponse = await fetch(`https://dissidiadb.com${appJsEndpoint}`)
      const jsFile = await jsResponse.text()
      dispatch(getGameInformationSuccess(parse(jsFile)))
      return
    }
    dispatch(getGameInformationFail({
      message: 'Couldn\'t found the resources endpoint',
    }))
  } catch (err) {
    dispatch(getGameInformationFail(err))
  }
}

export {
  getGameInformation,
  saveOwnedGear,
  fetchFromDissidiadb,
  applyFilters,
  tagCharacter,
  untagCharacter,
  GET_GAME_INFORMATION,
  GET_GAME_INFORMATION_FAIL,
  GET_GAME_INFORMATION_SUCCESS,
  SAVE_OWNED_GEAR,
  APPLY_FILTERS,
  TAG_CHARACTER,
  UNTAG_CHARACTER,
}
