import StateProps from '../redux/stateTypes'
import { SavedGear, Character, Gear } from '../../types/common'
import { ApplyFilterArgs } from '../redux/actions'

export interface Props {
  characters: Character[],
  savedGears: SavedGear[],
  characterRoles: string[],
}

export interface AxisPoint {
  value: number,
  label: string,
}

export interface HorizontalBarGraphData {
  yAxis: AxisPoint[],
  maxXAxis?: number,
  data: number[],
}

declare function filterGears(state: ApplyFilterArgs): Gear[]
declare function calculateGearDistribuitionByRole(state: Props): HorizontalBarGraphData
declare function addRoleToCharacter(state: StateProps, role: string, character: Character): Character[]
declare function removeRoleFromCharacter(state: StateProps, role: string, character: Character): Character[]
