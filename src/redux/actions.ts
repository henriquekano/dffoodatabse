import { Dispatch } from 'redux'
import { Gear, Character } from '../../types/common'
import { parse, Parsed as ParsedDffooDb } from '../scrapper/parser'
import {
  parse as parseBannerInformation,
  Parsed as ParsedAltema,
} from '../scrapper/parser/altema'

const GET_GAME_INFORMATION = 'GET_GAME_INFORMATION'
const GET_GAME_INFORMATION_SUCCESS = 'GET_GAME_INFORMATION_SUCCESS'
const GET_GAME_INFORMATION_FAIL = 'GET_GAME_INFORMATION_FAIL'
const SAVE_OWNED_GEAR = 'SAVE_OWNED_GEAR'
const APPLY_FILTERS = 'APPLY_FILTERS'
const ADD_NAME_FILTER = 'ADD_NAME_FILTER'
const TAG_CHARACTER = 'TAG_CHARACTER'
const UNTAG_CHARACTER = 'UNTAG_CHARACTER'
const GET_BANNER_INFORMATION = 'GET_BANNER_INFORMATION'
const GET_BANNER_INFORMATION_SUCCESS = 'GET_BANNER_INFORMATION_SUCCESS'
const GET_BANNER_INFORMATION_FAIL = 'GET_BANNER_INFORMATION_FAIL'

export type ActionType = 'GET_GAME_INFORMATION'
  | 'GET_GAME_INFORMATION'
  | 'GET_GAME_INFORMATION_FAIL'
  | 'GET_GAME_INFORMATION_SUCCESS'
  | 'SAVE_OWNED_GEAR'
  | 'APPLY_FILTERS'
  | 'ADD_NAME_FILTER'
  | 'TAG_CHARACTER'
  | 'UNTAG_CHARACTER'
  | 'GET_BANNER_INFORMATION'
  | 'GET_BANNER_INFORMATION_SUCCESS'
  | 'GET_BANNER_INFORMATION_FAIL'

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

export interface DffooDbFetchAction extends BaseAction {
  payload: ParsedDffooDb,
}

export interface AltemaFetchAction extends BaseAction {
  payload: {
    banners: ParsedAltema,
  },
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

export type Action = BaseAction | RoleAction | DffooDbFetchAction | ErrorAction | SaveGearAction | AltemaFetchAction

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

const getGameInformationSuccess = (payload: ParsedDffooDb): DffooDbFetchAction => ({
  type: GET_GAME_INFORMATION_SUCCESS,
  payload,
})

const getGameInformationFail = (err: any): ErrorAction => ({
  type: GET_GAME_INFORMATION_FAIL,
  err,
})

const getBannerInformation = (): BaseAction => ({
  type: GET_BANNER_INFORMATION,
})

const getBannerInformationSuccess = (payload: ParsedAltema): AltemaFetchAction => ({
  type: GET_BANNER_INFORMATION_SUCCESS,
  payload,
})

const getBannerInformationFail = (err: any): ErrorAction => ({
  type: GET_BANNER_INFORMATION_FAIL,
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

const fetchBannerInformation = () => (dispatch: Dispatch) => {
  dispatch(getBannerInformation())
  return Promise.all([
    fetchFromDissidiadb()(dispatch),
    fetch('https://altema.jp/dffoo/gachamemorialhall-2-7012'),
  ])
    .then(
      ([,mainPageResponse]) => mainPageResponse.text(),
      err => dispatch(getBannerInformationFail(err.message))
    )
    .then(
      mainPageHtml =>
        dispatch(getBannerInformationSuccess({
          banners: parseBannerInformation(mainPageHtml),
        }))
    )
    .catch(() => {})
}

export {
  saveOwnedGear,
  fetchFromDissidiadb,
  fetchBannerInformation,
  applyFilters,
  tagCharacter,
  untagCharacter,
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
}
