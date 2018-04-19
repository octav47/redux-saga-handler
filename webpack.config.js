const webpack = require('webpack')
const path = require('path')

module.exports = {
    resolve: {
        extensions: ['*', '.js', '.jsx', '.json'],
    },
    entry: ['babel-polyfill', './tests/main.js'],
    output: {
        path: path.resolve(__dirname, 'tests'),
        filename: 'tests.bundle.js',
    },
    module: {
        rules: [
            { test: /\.js?$/, exclude: /node_modules/, loaders: ['babel-loader'] },
        ],
    },
}
