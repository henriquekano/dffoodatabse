import { Character, Filters, Gear, SavedGear, SavedCharacter, Banner, NaturalPassiveAbility } from '../../types/common'

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
  gears?: Gear[],
  characters?: Character[],
  savedGears: SavedGear[],
  savedCharacters: {
    [slug: string]: SavedCharacter,
  },
  filteredGears: Gear[],
  fetchError?: any,
  fetchingGears: boolean,
  characterRoles: string[],
  // banner stuff
  fetchingBanners: boolean,
  fetchingBannersError: any,
  banners?: Banner[],
  naturalPassiveAbilities: NaturalPassiveAbility[],
}

export default StateProps
