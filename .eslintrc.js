module.exports = {
  env: {
    browser: true,
    node: true
  },
  parser: 'vue-eslint-parser',
  plugins: [
    'vue',
    'prettier'
  ],
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:vue/recommended',
    'prettier/@typescript-eslint',
    'prettier/vue'
  ],
  rules: {
    'prettier/prettier': [ 'error',
      {
        'semi': false,
        'singleQuote': true,
        'overrides': [
          {
            'files': '*.pug',
            'options': {
              'parser': 'pug',
              'singleQuote': true
            }
          }
        ]
      }
    ]
  }
}
