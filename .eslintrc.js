const resolve = require('path').resolve

module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true
  },
  extends: [
    'airbnb-base',
    'prettier',
  ],
  // required to lint *.vue files
  plugins: [
    'html',
    'prettier',
  ],
  // add your custom rules here
  rules: {
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-param-reassign': ['error', { 'props': false }],
    'prettier/prettier': 'error',
  },
  globals: {},
  settings: {
    'import/resolver': {
      webpack: {
        config: {
          resolve: {
            alias: {
              '~': __dirname,
              'static': resolve(__dirname, 'static'), // use in template with <img src="~static/nuxt.png" />
              '~static': resolve(__dirname, 'static'),
              'assets': resolve(__dirname, 'assets'), // use in template with <img src="~static/nuxt.png" />
              '~assets': resolve(__dirname, 'assets'),
              '~plugins': resolve(__dirname, 'plugins'),
              '~store': resolve(__dirname, '.nuxt/store'),
              '~router': resolve(__dirname, '.nuxt/router'),
              '~pages': resolve(__dirname, 'pages'),
              '~components': resolve(__dirname, 'components')
            }
          }
        }
      }
    }
  }
}
