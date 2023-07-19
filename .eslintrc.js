module.exports = {
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  extends: ['plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import'],
  rules: {
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
      },
    ],
    indent: 'off', // Prettier
    quotes: 'off', // Prettier
    'no-undef': 'error',
    'prefer-const': 'error',
    semi: ['error', 'always'],
    'no-console': ['error', { allow: ['error'] }],
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-var-requires': 'off',

    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],

    // TODO: fixme and switch to `error`
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.mjs'],
      },
    },
  },

  overrides: [
    {
      files: [
        'staking/ui/**/*',
        'staking/components/**/*',
        'staking/lib/**/*',
        'theme/**/*',
        'oracle-manager-ui/**/*',
        'governance/**/*',
      ],

      env: {
        browser: true,
      },

      extends: ['plugin:react/recommended'],
      plugins: ['react', 'react-hooks', '@tanstack/query'],

      settings: {
        react: {
          version: '18.2.0',
        },
      },

      globals: {
        React: true,
      },

      rules: {
        quotes: 'off',
        'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
        'react/prop-types': 'off', // using ts
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error',
        '@tanstack/query/exhaustive-deps': 'off', // not smart enough, does not take into account `enabled` and global imports
        '@tanstack/query/prefer-query-object-syntax': 'error',
      },
    },

    {
      files: [
        '**/cypress/**/*.js',
        '**/*.cy.js',
        '**/*.cy.ts',
        '**/*.cy.tsx',
        '**/*.e2e.js',
        '**/*.e2e.ts',
        '**/*.e2e.tsx',
      ],
      env: {
        mocha: true,
      },
      globals: {
        cy: true,
        Cypress: true,
        expect: true,
      },
      rules: {},
    },
  ],
};
