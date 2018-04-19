const webpack = require('webpack')
const path = require('path')

module.exports = {
    resolve: {
        extensions: ['*', '.js', '.jsx', '.json'],
    },
    entry: './tests/main.js',
    output: {
        path: path.resolve(__dirname, 'tests'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            { test: /\.js?$/, exclude: /node_modules/, loaders: ['babel-loader'] },
        ],
    },
}
