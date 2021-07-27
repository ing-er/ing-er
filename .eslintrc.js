module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ['airbnb'],
  rules: {
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.js', '.jsx'],
      },
    ],
    'no-console': 0,
    'linebreak-style': 0,
    'arrow-body-style': ['error', 'never'],
    'react/react-in-jsx-scope': 'off',
  },
};
