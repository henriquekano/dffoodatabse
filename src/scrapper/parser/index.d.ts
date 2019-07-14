import { Gear, Character, NaturalPassiveAbility } from '../../../types/common'

interface Parsed {
  gears: Gear[],
  characters: Character[],
  characterRoles: string[],
  naturalPassiveAbilities: NaturalPassiveAbility[],
}

declare function parse(jsFile: string): Parsed
