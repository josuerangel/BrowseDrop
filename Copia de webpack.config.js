const path = require('path');
var webpack = require('webpack');
var CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
    entry: {
        app: [__dirname + '/src'],
        "browse-drop-standalone": [__dirname + '/src/components/wrapper/standalone.js']
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: '[name].js',
        publicPath: '/dist'
    },
    //devtool: "cheap-module-source-map",
    devtool: "source-map",
    //devtool: "cheap-module-eval-source-map",
    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }, {
            test: /\.styl$/,
            use: ['style-loader', 'css-loader', 'stylus-loader'],
        }, {
            test: /\.(js|jsx)$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader'
            }
        }, {
            test: /\.styl$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "stylus-loader" // compiles Stylus to CSS
            }]
        }]
    },
    plugins: [],
    resolve: {
        alias: {
            'react': path.join(__dirname, 'node_modules', 'react')
        },
        extensions: ['.js', '.jsx', '.styl']
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
    }
};