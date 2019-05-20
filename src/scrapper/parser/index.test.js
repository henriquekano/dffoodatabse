import fs from 'fs'
import path from 'path'
import R from 'ramda'
import {
  _getRawGears,
  normalizeRawGears,
  _getCharacterIcon,
  _getCharacterGear,
  parse,
} from '.'

test('should parse the gears ', () => {
  const data = fs.readFileSync(
    path.join(__dirname, 'dbdissidia.txt'),
    'utf8',
  )
  const gears = _getRawGears(eval(data))
  expect(R.path(['cloud', 'abilityWeapon', 'name', 'en'], gears))
    .toBe('Force Stealer')
})

test('should have the expected format', () => {
  const possibleWeaponTypes = [
    'baseWeapon', // 15cp
    'summonWeapon', // 15cp
    'exclusiveWeapon', // 35
    'exclusiveWeapon2', //35
    'manikinWeapon', // WoI
    'abilityWeapon', // EX
    'exclusiveArmor', //weapon token
    'fourStarWeapon',
    'fourStarArmor',
    'secondArmor', //jp gear
  ]
  const data = fs.readFileSync(
    path.join(__dirname, 'dbdissidia.txt'),
    'utf8'
  )
  const gears = _getRawGears(data)
  const characters = Object.keys(gears)

  characters.forEach((character) => {
    const charGears = Object.keys(gears[character])
    charGears.forEach(charGear =>
      expect(possibleWeaponTypes).toContain(charGear)
    )
  })
})

test('should simplify the raw format', () => {
  const example = {
    cloud: {
      super_weapon_type: {
        name: {},
        atk: 100,
      },
    },
    vivi: {
      super_weapon_type2: {
        atk: 110,
      },
    },
  }
  expect(normalizeRawGears(example))
    .toEqual(expect.arrayContaining([
      {
        atk: 100,
        character: {
          name: 'cloud',
        },
        gearType: 'super_weapon_type',
        name: {},
      },
    ]))
})

test('should filter non named gear', () => {
  const example = {
    cloud: {
      super_weapon_type: {
        name: {},
        atk: 100,
      },
    },
    vivi: {
      super_weapon_type2: {
        atk: 110,
      },
    },
  }
  expect(normalizeRawGears(example))
    .toEqual(expect.not.arrayContaining([
      {
        atk: 110,
        character: 'vivi',
        gearType: 'super_weapon_type2',
      },
    ]))
})

test('should get the character icon url', () => {
  const data = fs.readFileSync(
    path.join(__dirname, 'dbdissidia.txt'),
    'utf8'
  )
  const url = _getCharacterIcon(data, 'warrior_of_light')
  expect(url).toBe('https://dissidiadb.com/static/img/warrior_of_light.01d67f3.png')
})

test('should get the character\'s gear url', () => {
  const data = fs.readFileSync(
    path.join(__dirname, 'dbdissidia.txt'),
    'utf8'
  )
  const url = _getCharacterGear(data, 'warrior_of_light', 'Sword of a false hero')
  expect(url).toBe('https://dissidiadb.com/static/img/sword_of_a_false_hero.4398bae.png')
})

test.only('should parse the gears and characters data ', () => {
  const data = fs.readFileSync(
    path.join(__dirname, 'dbdissidia.txt'),
    'utf8',
  )
  const parsed = parse(data)
  console.log(parsed.characters[0])
  console.log(parsed.gears)
  // expect(parsed.characters).toContainEqual(
  //   {
  //     id: 6,
  //     slug: 'cloud',
  //     released: true,
  //     profile: {
  //       fullName: {
  //         en: 'Cloud',
  //         jp: 'ã‚¯ãƒ©ã‚¦ãƒ‰',
  //       },
  //       va: {
  //         en: 'Takahiro Sakurai',
  //         jp: 'æ«»äº• å­å®',
  //       },
  //       world: 7,
  //       crystal: 2,
  //       weaponType: 3,
  //       traits: {
  //         elements: [],
  //         role: ['Melee', 'Ranged', 'Attacker', 'Chaser'],
  //         spheres: ['A', 'D', 'E'],
  //       },
  //       description: {
  //         en: 'A young man who is a former SOLDIER.\\nIn pursuing his nemesisã€ Sephirothã€ and attempting to protect his worldã€ he learns the truth of his own past.\\nHe often claims to be \'not interested\'â”€a notion that is reinforced by his detached demeanor.\\nIt is a mask that breaks only when he is overcome by motion sickness.',
  //         jp: 'ç¥žç¾…ã‚«ãƒ³ãƒ‘ãƒ‹ãƒ¼ã®å…ƒã‚½ãƒ«ã‚¸ãƒ£ãƒ¼ã‚’è‡ªç§°ã™\\nã‚‹é’å¹´ã€‚ã€Œæ˜Ÿã€ã‚’å®ˆã‚‹ãŸã‚ å®¿æ•µã§ã‚ã‚‹\\nã‚»ãƒ•ã‚£ãƒ­ã‚¹ã‚’è¿½ã†æ—…ã®ãªã‹ã§ ä»²é–“ã¨å…±\\nã«å·±ã®éŽåŽ»ã¨å‘ãåˆã„ æœ¬æ¥ã®è‡ªåˆ†ã‚’å–\\nã‚Šæˆ»ã—ã¦ã‚†ãã€‚\\nå£ç™–ã¯ã€Œèˆˆå‘³ãªã„ã­ã€ã¨ã‚¯ãƒ¼ãƒ«ãªæ€§æ ¼\\nã ãŒ ä¹—ã‚Šç‰©ã«å¼±ã„ã€‚',
  //       },
  //     },
  //     status: {
  //       levelCap: 70,
  //       baseStats: {
  //         initial: {
  //           HP: 950,
  //           iBRV: 160,
  //           mBRV: 525,
  //           ATK: 180,
  //           DEF: 150,
  //           SPD: 25,
  //         },
  //         level50: {
  //           HP: 1959,
  //           iBRV: 739,
  //           mBRV: 960,
  //           ATK: 329,
  //           DEF: 274,
  //         },
  //         levelUp60: {
  //           HP: 44,
  //           iBRV: 60,
  //           mBRV: 82,
  //           ATK: 10,
  //           DEF: 11,
  //         },
  //         levelUp70: {
  //           HP: 29,
  //           iBRV: 30,
  //           mBRV: 31,
  //           ATK: 8,
  //           DEF: 13,
  //         },
  //       },
  //       awakeningPassives: {
  //         level50: {
  //           HP: 280,
  //           mBRV: 105,
  //           ATK: 36,
  //           DEF: 30,
  //         },
  //         level60: {
  //           ATK: 100,
  //           DEF: 100,
  //         },
  //         level70: {
  //           iBRV: 100,
  //           mBRV: 110,
  //         },
  //       },
  //       awakeningStats: {
  //         level50: {
  //           HP: 1900,
  //           mBRV: 477,
  //           ATK: 180,
  //           DEF: 150,
  //         },
  //         level60: {
  //           HP: 440,
  //           mBRV: 820,
  //           ATK: 100,
  //           DEF: 210,
  //         },
  //         level70: {
  //           HP: 290,
  //           iBRV: 300,
  //           mBRV: 310,
  //           ATK: 80,
  //           DEF: 130,
  //         },
  //       },
  //     },
  //     trueId: 1,
  //     chapterId: 1,
  //     videoId: 'ZnhIyuj0hYk',
  //     outfit: !0,
  //   },
  // )
})
