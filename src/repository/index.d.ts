import StateProps from '../redux/stateTypes'
import { SavedGear, Character, Gear } from '../../types/common'

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

declare function filterGears(state: StateProps): Gear[]
declare function calculateGearDistribuitionByRole(state: Props): HorizontalBarGraphData
