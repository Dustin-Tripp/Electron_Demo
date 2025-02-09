module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    '@electron-toolkit/eslint-config-ts/recommended',
    '@electron-toolkit/eslint-config-prettier'
  ],
  rules: {
    'linebreak-style': 'off', // Disable ESLint's linebreak check
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto' // Let Prettier handle line endings automatically
      }
    ]
  }
}
