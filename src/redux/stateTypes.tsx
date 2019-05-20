import { Character, Filters, Gear, SavedGear } from '../../types/common'

enum Role {
  MELEE = "MELEE",
  ATTACKER = "ATTACKER",
  MAGIC = "MAGIC",
  DEBUFFER = "DEBUFFER",
  RANGED = "RANGED",
  TANK = "TANK",
  SUPPORT = "SUPPORT",
  PARTY = "PARTY BRV",
  HEALER = "HEALER",
  CHASER = "CHASER",
  DISPEL = "DISPEL",
}

interface StateProps {
  gears: Gear[],
  characters: Character[],
  savedGears: SavedGear[],
  filteredGears: Gear[],
  filters: {
    role: string[],
    name?: string,
  },
  fetchingGears: boolean,
  characterRoles: string[],
}

export default StateProps
