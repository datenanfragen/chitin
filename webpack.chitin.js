const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const IconfontWebpackPlugin = require('iconfont-webpack-plugin');

module.exports = {
    entry: {
        'style': './src/styles/main.scss'
    },
    output: {
        filename: 'js/[name].gen.js',
        path: path.resolve(__dirname, 'static')
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true,
                uglifyOptions: {
                    ie8: false,
                    mangle: {
                        safari10: true
                    }
                }
            }),
            new OptimizeCSSAssetsPlugin({})
        ],
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: 'style',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { importLoaders: 2 }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: (loader) => [
                                new IconfontWebpackPlugin(loader)
                            ]
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif|eot|ttf|woff|woff2)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000
                }
            },
            {
			    test: /\.svg/,
			    use: {
			        loader: 'svg-url-loader',
			        options: {}
			    }
			}
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].gen.css'
        })
    ],
    resolve: {
        modules: [ 'src', 'node_modules', 'i18n', 'res/icons' ]
    }
};
