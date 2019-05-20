module.exports = {
  'extends': 'airbnb',
  'parser': 'babel-eslint',
  'env': {
    'jest': true,
  },
  'rules': {
    'no-use-before-define': 'off',
    'react/jsx-filename-extension': 'on',
    'react/prop-types': 'on',
    'comma-dangle': 2,
    'semi': 0,
    'eqeqeq': 2,
    'indent': ['error', 2]
  },
  'globals': {
    "fetch": false
  }
}
