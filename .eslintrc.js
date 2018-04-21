module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module'
    },
    env: {
        browser: true,
    },
    extends: 'standard',
    rules: {
        'vue/html-no-self-closing': 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
    }
}