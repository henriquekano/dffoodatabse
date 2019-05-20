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

type Gear = {
  name: {
    en: string,
    jp: string,
  },
  icon: string,
  character: {
    name: string,
    icon: string,
  },
}

type Character = {
  profile: {
    traits: {
      role: Role[],
    },
  },
}

type SavedGear = {
  icon: string,
  limitBreakLevel: number,
}

type Filter = {
  role: Role[],
  name: string,
}

export {
  Role,
  Gear,
  Character,
  SavedGear,
  Filter,
}
