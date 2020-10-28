var path = require('path');
var webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: './assets/javascript/app.js',
    output: {
        path: path.resolve(__dirname, 'assets/javascript/'),
        filename: 'app.min.js'
    },
    module: {
        rules: [
            {test: /\.js?$/, exclude: /node_modules/, loader: 'babel-loader'}
        ]
    },
    stats: {
        colors: true
    }
};