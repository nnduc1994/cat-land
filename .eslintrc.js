module.exports = {
  extends: 'airbnb-base',
  env: {
    jest: true,
    node: true,
    es6: true,
  },
  overrides: [
    {
      files: [
        '**/*.test.js',
        '**/webpack.config.js',
      ],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
};
