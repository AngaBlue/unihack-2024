const path = require('path');
const eslintConfigNext = require('eslint-config-next');

module.exports = {
    ...eslintConfigNext,
    root: true,
    extends: ['@angablue', ...eslintConfigNext.extends],
    parser: undefined,
    plugins: ['react', 'jsx-a11y'],
    ignorePatterns: ['.contentlayer/**', '**/dist/**', '**/*.json'],
    rules: {
        ...eslintConfigNext.rules,
        'global-require': 'off',
        // 'no-html-link-for-pages': [2, path.join(__dirname, 'app')],
        '@next/next/no-html-link-for-pages': [2, path.join(__dirname, 'app')]
    },
    parserOptions: {
        tsconfigRootDir: __dirname
    }
};
