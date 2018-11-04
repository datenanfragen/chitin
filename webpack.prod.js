const merge = require('webpack-merge');
const chitin = require('./webpack.chitin.js');
const webpack = require('webpack');

module.exports = merge(chitin, {
    devtool: 'source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ]
});
