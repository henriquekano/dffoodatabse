const R = require('ramda')

const _capitalize = R.compose(
  R.join(''),
  R.over(R.lensIndex(0), R.toUpper),
)

const snakeCaseToSpacedCamelCase = R.pipe(
  R.split(/_/g),
  R.map(_capitalize),
  R.join(' ')
)

export {
  snakeCaseToSpacedCamelCase,
}
