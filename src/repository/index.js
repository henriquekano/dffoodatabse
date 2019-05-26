import R from 'ramda'

const filterGears = (state) => {
  const {
    characters,
    filters: { role: roleFilters, characterNameFilter, gearName },
    gears,
  } = state

  const hasGearNameFilter = !!gearName
  const hasRoleFilter = roleFilters && roleFilters.length > 0
  const hasCharacterNameFilter = !!characterNameFilter

  if (!hasRoleFilter && !hasCharacterNameFilter && !hasGearNameFilter) {
    return gears
  }

  let filteredGears = gears

  if (hasRoleFilter) {
    const extractNameAndRoleIntersectionWithFilter = R.map(
      R.applySpec({
        name: R.propOr('', 'slug'),
        rolesIntersection: R.pipe(
          R.pathOr([], ['profile', 'traits', 'role']),
          R.intersection(
            roleFilters,
          ),
        ),
      }),
    )
    const charactersIntersectionsWithTheFilter = R.pipe(
      extractNameAndRoleIntersectionWithFilter,
      R.filter(
        R.pipe(
          R.propOr([], 'rolesIntersection'),
          R.length,
          R.equals(roleFilters.length),
        ),
      ),
      R.pluck('name'),
    )(characters)

    filteredGears = R.filter(
      R.pipe(
        R.path(['character', 'name']),
        // eslint-disable-next-line no-underscore-dangle
        R.contains(R.__, charactersIntersectionsWithTheFilter),
      ),
    )(gears)
  }

  if (hasCharacterNameFilter) {
    const minimizeString = R.pipe(
      R.replace(/\W/g, ''),
      R.toLower,
    )
    filteredGears = R.filter(
      R.pipe(
        R.pathOr('', ['character', 'name']),
        R.replace(/\W/g, ''),
        minimizeString,
        R.includes(minimizeString(characterNameFilter)),
      ),
    )(filteredGears)
  }

  if (hasGearNameFilter) {
    const minimizeString = R.pipe(
      R.replace(/\W/g, ''),
      R.toLower,
    )
    filteredGears = R.filter(
      R.pipe(
        R.pathOr('', ['name', 'en']),
        R.replace(/\W/g, ''),
        minimizeString,
        R.includes(minimizeString(gearName)),
      ),
    )(filteredGears)
  }

  return filteredGears
}

const calculateGearDistribuitionByRole = (state) => {
  const {
    savedGears,
    characters,
    characterRoles,
  } = state
  const rolesByCharacterName = R.pipe(
    R.map(
      R.applySpec({
        slug: R.prop('slug'),
        roles: R.path(['profile', 'traits', 'role']),
      }),
    ),
    R.indexBy(R.prop('slug')),
  )(characters)

  const countOfGearsByCharacterRole = R.pipe(
    R.map(R.path(['gear', 'character', 'name'])),
    // eslint-disable-next-line no-underscore-dangle
    R.map(R.prop(R.__, rolesByCharacterName)),
    R.pluck('roles'),
    R.flatten,
    R.countBy(R.identity),
  )(savedGears)

  const roleVsCountSortedByRole = R.pipe(
    R.toPairs,
    R.sortBy(R.prop(0)),
  )(countOfGearsByCharacterRole)

  const yAxis = []
  const data = []
  roleVsCountSortedByRole.forEach(([ role, count ], index) => {
    yAxis.push({
      value: index,
      label: role,
    })
    data.push({
      value: count,
      label: R.toString(count),
    })
  })

  const yAxisContainsAllRoles = R.pipe(
    R.intersection(characterRoles),
    R.length,
    R.equals(characterRoles.length),
  )(yAxis)
  if (!yAxisContainsAllRoles) {
    const missingRoles = R.difference(
      characterRoles,
      R.map(R.prop('label'), yAxis),
    )
    missingRoles.forEach((role, index) => {
      yAxis.push({
        value: index + yAxis.length + 1,
        label: role,
      })
      data.push({
        value: 0,
        label: '0',
      })
    })
  }

  const maxXValue = R.pipe(
    R.map(R.prop('value')),
    R.reduce(
      R.max,
      -Infinity,
    ),
  )(data)
  const maxXAxis = maxXValue + Math.round(maxXValue / 5) + 1

  return {
    yAxis,
    maxXAxis,
    data,
  }
}

export {
  filterGears,
  calculateGearDistribuitionByRole,
}
