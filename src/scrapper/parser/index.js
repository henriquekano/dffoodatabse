/* eslint-disable no-underscore-dangle */
import R from 'ramda'

// eslint-disable-next-line no-unused-vars
const webpackJsonp = (...args) => args[1]

const _getRawGears = (evaledJsFile) => {
  const secondParameter = evaledJsFile
  const gearsFunction = secondParameter.pZ10

  const e = {}
  const t = {}
  gearsFunction(e, t)

  return e.exports
}

const mapObjIndexedToArray = R.curry(
  (howToMap, obj) => {
    const keys = Object.keys(obj)
    return R.map(key => howToMap(key, obj[key]), keys)
  },
)

/*
[{
  char: {
    gearType: {
      ...gearInfo
    }
  }
}]
to
[
  {
    ...gearInfo,
    char,
  }
]
*/
const normalizeRawGears = R.pipe(
  mapObjIndexedToArray((charName, gears) => mapObjIndexedToArray(
    (gearType, gearInfo) => ({
      ...gearInfo,
      character: {
        name: charName,
      },
      gearType,
    }),
    gears,
  )),
  R.flatten,
  R.filter(R.has('name')),
)

const _getCharacterIcon = (evaledJsFile, characterName) => {
  const secondParameter = evaledJsFile
  const staticResourcesLazyLoaderFunc = secondParameter.V5bU

  const e = {}
  const t = {}
  const a = {}
  staticResourcesLazyLoaderFunc(e, t, a)

  const lazyLoaderIndex = e.exports.resolve(`./characters/${characterName}.png`)
  const lazyLoader = secondParameter[lazyLoaderIndex]

  const e2 = {}
  lazyLoader(e2, null, {
    p: 'https://dissidiadb.com/',
  })

  return e2.exports
}

const _getCharacterGear = (evaledJsFile, characterName, gearName) => {
  const secondParameter = evaledJsFile
  const staticResourcesLazyLoaderFunc = secondParameter.V5bU

  const e = {}
  const t = {}
  const a = {}
  staticResourcesLazyLoaderFunc(e, t, a)

  const cleanGearName = R.pipe(
    R.toLower,
    R.replace(/\.$/, ' '),
    R.replace(/ & /g, '&'),
    R.replace(/[^\w&.\- ]/g, ''),
    R.replace(/ /g, '_'),
  )
  const lazyLoaderIndex = e.exports.resolve(
    `./gear/${characterName}/${cleanGearName(gearName)}.png`,
  )
  const lazyLoader = secondParameter[lazyLoaderIndex]

  const e2 = {}
  lazyLoader(e2, null, {
    p: 'https://dissidiadb.com/',
  })

  return e2.exports
}

const normalizeCharactersData = R.map(
  R.pipe(
    R.over(
      R.lensPath(['profile', 'traits', 'role']),
      R.map(
        R.toUpper,
      ),
    ),
  ),
)

const _getCharacters = (jsFile) => {
  const evaled = jsFile
  const charactersFunc = evaled.qyXR

  let e = {
    exports: null, // here will be the characters
  }
  let t = {}
  charactersFunc(e, t)

  return normalizeCharactersData(e.exports)
}

const _getGears = (jsFile) => {
  const evaled = jsFile
  const gears = _getRawGears(evaled)
  const normalized = normalizeRawGears(gears)
  return normalized.map((gear) => {
    const charIcon = _getCharacterIcon(evaled, gear.character.name)

    const gearIcon = _getCharacterGear(evaled, gear.character.name, gear.name.en)
    return {
      ...gear,
      character: {
        name: gear.character.name,
        icon: charIcon,
      },
      icon: gearIcon,
    }
  })
}

const parse = (jsFile) => {
  const evaledFile = eval(jsFile)

  const characters = _getCharacters(evaledFile)
  const characterRoles = R.pipe(
    R.map(
      R.path(['profile', 'traits', 'role']),
    ),
    R.flatten,
    R.uniq,
  )(characters)
  return {
    gears: _getGears(evaledFile),
    characters,
    characterRoles,
  }
}

export {
  _getRawGears,
  normalizeRawGears,
  _getCharacterIcon,
  _getCharacterGear,
  _getGears,
  parse,
}
