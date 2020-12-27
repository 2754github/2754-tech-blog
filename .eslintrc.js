module.exports = {
  env: { browser: true, es2021: true, node: true },
  extends: [
    'plugin:react/recommended',
    // 'eslint:recommended', 代わりに 'airbnb' を用いる
    // https://github.com/airbnb/javascript
    'airbnb',
    // https://www.npmjs.com/package/eslint-config-airbnb#eslint-config-airbnbhooks
    'airbnb/hooks',
    // https://www.npmjs.com/package/@typescript-eslint/eslint-plugin
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    // https://www.npmjs.com/package/eslint-plugin-import#typescript
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    // https://www.npmjs.com/package/eslint-plugin-jsx-a11y#usage
    'plugin:jsx-a11y/recommended',
  ],
  // https://www.npmjs.com/package/@typescript-eslint/parser
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.eslint.json',
    tsconfigRootDir: __dirname,
  },
  //
  plugins: ['@typescript-eslint', 'import', 'jsx-a11y', 'prefer-arrow', 'react', 'react-hooks'],
  root: true,
  settings: {
    'import/resolver': { node: { paths: ['.'] } },
    react: { version: 'detect' },
  },
  rules: {
    // eslint-config-airbnb と反する部分
    'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
    'react/jsx-props-no-spreading': 'off',
    // Next.js 用
    'react/react-in-jsx-scope': 'off', // 'React' の import が不要なためoff
    'jsx-a11y/anchor-is-valid': [
      'error',
      { components: ['Link'], specialLink: ['hrefLeft', 'hrefRight'], aspects: ['invalidHref', 'preferButton'] },
    ], // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md#rule-details
    // emotion 用
    'no-use-before-define': 'off', // タグ定義を後で書くためoff
    '@typescript-eslint/no-use-before-define': 'off', // タグ定義を後で書くためoff
    // 以下、自分の好み
    camelcase: 'warn',
    'object-curly-newline': 'off',
    '@typescript-eslint/ban-ts-comment': ['error', { 'ts-ignore': 'allow-with-description' }],
    // 未使用変数の定義を、変数名を'_'にしたときのみ許容する。
    '@typescript-eslint/no-unused-vars': [
      'error',
      { vars: 'all', args: 'after-used', argsIgnorePattern: '_', ignoreRestSiblings: false, varsIgnorePattern: '_' },
    ],
    // npm パッケージ以外のファイルでは「js, jsx, ts, tsx」の拡張子を省略
    'import/extensions': ['error', 'ignorePackages', { js: 'never', jsx: 'never', ts: 'never', tsx: 'never' }],
    'import/no-default-export': 'error',
    // https://www.npmjs.com/package/eslint-plugin-prefer-arrow#installation
    'prefer-arrow/prefer-arrow-functions': ['error', { disallowPrototype: true, singleReturnOnly: false, classPropertiesAllowed: false }],
    // Prettier の設定とバッティングすることがあるためoff
    'react/jsx-wrap-multilines': 'off',
    // https://ja.reactjs.org/docs/hooks-rules.html#eslint-plugin
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
  overrides: [{ files: ['*.ts', '*.tsx'], rules: { 'react/prop-types': 'off' } }], // eslint-config-airbnb と反する部分
};
