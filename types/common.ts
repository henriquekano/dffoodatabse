
// parsed stuff
export interface Character {
  id: number,
  icon: string,
  slug: string,
  released: boolean,
  profile: {
    fullName: {
      en: string,
      jp: string,
    },
    va: {
      en: string,
      jp: string,
    },
    world: number,
    crystal: number,
    weaponType: number,
    traits: {
      elements: string[],
      role: Roles,
      spheres: string[],
    },
    description: {
      en: string,
      jp: string,
    }
  },
  status: {
    levelCap: number,
    baseStats: {
      initial: {
        HP: number,
        iBRV: number,
        mBRV: number,
        ATK: number,
        DEF: number,
        SPD: number,
      },
      level50: {
        HP: number,
        iBRV: number,
        mBRV: number,
        ATK: number,
        DEF: number,
      },
      levelUp60: {
        HP: number,
        iBRV: number,
        mBRV: number,
        ATK: number,
        DEF: number,
      },
      levelUp70: {
        HP: number,
        iBRV: number,
        mBRV: number,
        ATK: number,
        DEF: number,
      }
    },
    awakeningPassives: {
      level50: {
        mBRV: number,
        HP: number,
        DEF: number,
        ATK: number,
      },
      level60: {
        DEF: number,
        ATK: number,
      },
      level70: {
        iBRV: number,
        mBRV: number,
      }
    },
    awakeningStats: {
      level50: {
        mBRV: number,
        HP: number,
        DEF: number,
        ATK: number,
      },
      level60: {
        HP: number,
        DEF: number,
        mBRV: number,
        ATK: number,
      },
      level70: {
        DEF: number,
        HP: number,
        ATK: number,
        iBRV: number,
        mBRV: number,
      }
    }
  },
  trueId: number,
  chapterId: number,
}

export interface Gear {
  type: string,
  name: {
    en: string,
    jp: string,
  },
  stats: {
    HP: number,
    iBRV: number,
    mBRV: number,
    ATK: number,
    DEF: number,
  },
  passive: {
    name: {
      en: string,
      jp: string,
    },
    description: string,
  },
  sortId: number,
  gearType: string,
  character: {
    name: number,
    icon: string,
  },
  icon: string,
}

export interface SavedGear {
  gear: Gear,
  limitBreakLevel: number,
}

export interface SavedCharacter {
  roles: string[],
  character: Character,
}

export interface Filters {
  role: Roles,
  name?: string,
}

export interface Banner {
  image: string,
  gears: string[],
  year: number,
  quarter: number,
}

/**
 * Passive acquired by level
 */
export interface NaturalPassiveAbility {
  name: {
    en: string,
    jp: string,
    gl?: string,
  },
  type: string,
  cost: number,
  level: number,
  description: string,
  character_slug: string,
  globalDescription?: string,
}

type Roles = string[]
