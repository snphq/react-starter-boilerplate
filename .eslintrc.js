module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier/react', 'plugin:prettier/recommended'],
  plugins: ['react', 'react-hooks', 'prettier'],
  settings: {
    'import/resolver': {
      node: {},
      webpack: {
        config: './webpack',
      },
    },
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  rules: {
    'global-require': 'off',
    'no-console': 'off',
    'no-underscore-dangle': 'off',
    'function-paren-newline': 'off',
    'import/first': 'off',
    'comma-dangle': 'off',
    'import/prefer-default-export': 'off',
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.js', '.jsx'],
      },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
      },
    ],
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        specialLink: ['to'],
      },
    ],
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'react/forbid-prop-types': 'off',
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'es5',
      },
    ],

    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'func-names': ['error', 'never'],
  },
  globals: {
    RUNTIME_ENV: true,
  },
};
