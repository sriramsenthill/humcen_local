module.exports = {
  root: true,
  env: {
    node: true,
    commonjs: true,
  },
  parserOptions: {
    ecmaVersion: 2021, // Use the latest ECMAScript features
  },
  extends: ['eslint:recommended'],
  rules: {
    // Additional rules or overrides can be added here
  },
  overrides: [
    {
      files: ['**/*.test.js', '**/*.spec.js'],
      env: {
        jest: true,
      },
    },
  ],
};
