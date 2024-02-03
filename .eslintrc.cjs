module.exports = {
  "parserOptions": {
    // Required for certain syntax usages
    "ecmaVersion": 2020,
    "sourceType": "module",
  },
  "env": {
    "browser": true,
    "amd": true,
    "node": true
  },
  extends: [
    'eslint:recommended',
    "plugin:svelte/recommended",
  ],
  rules: {
    // override/add rules settings here, such as:
    // 'svelte/rule-name': 'error'
  },
}