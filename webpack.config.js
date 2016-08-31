var webpack = require('webpack'),
    path = require('path');

module.exports = {
    entry : './src/main.js',
    output : {
        path: 'build',
        filename: 'mmWigets.js'
    },
    module: {
        loaders: [
            {test: /\.css$/, loader: 'style!css'}
        ]
    }
}