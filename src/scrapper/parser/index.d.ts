import { Gear, Character } from '../../../types/common'

interface Parsed {
  gears: Gear[],
  characters: Character[],
  characterRoles: string[],
}

declare function parse(jsFile: string): Parsed
