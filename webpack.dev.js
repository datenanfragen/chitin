const merge = require('webpack-merge');
const chitin = require('./webpack.chitin.js');

module.exports = merge(chitin, {
    devtool: 'eval-source-map'
});
