const webpack = require('webpack')
const path = require('path')

module.exports = {
    resolve: {
        extensions: ['*', '.js', '.jsx', '.json'],
    },
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'reduxSagaHandler.js',
        library: 'reduxSagaHandler',
        libraryTarget: 'umd',
    },
    module: {
        rules: [
            { test: /\.js?$/, exclude: /node_modules/, loaders: ['babel-loader'] },
        ],
    },
}
