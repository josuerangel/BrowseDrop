const path = require('path');
var webpack = require('webpack');
var CompressionPlugin = require('compression-webpack-plugin');


module.exports = {
  entry: {
    app: [__dirname + '/src'],
    components: [__dirname + '/src/components/Component.js'],
    uploadBox: [__dirname + '/src/components/wrapper/wrapper2.js'],
    uploadBoxStandAlone : [__dirname + '/src/components/UploadBox/index.js'],
    uploadBox2: ['babel-polyfill', 'whatwg-fetch', __dirname + '/src/components/wrapper/wrapper3.js']
  },
  output: {
    path: './bundles',
    filename: '[name].js',
    publicPath: '/bundles/'
  },
  devtool: "cheap-module-source-map",
  module: {
    loaders: [
      {
        test: /.js/,
        loader: 'babel',
        include: __dirname + '/src',
        exclude: '/node_modules/'
      },
      {
        // whatwg-fetch use Promsie which IE11 doesn't support
        test: /\.js$/,
        include: [/whatwg-.*/],
        loader: 'babel'
      },
      {
        test: /\.css$/,
        loader:'style!css!'
      },
       { test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader' },
       {
            loader: 'json-loader',
            test: /\.json$/
        }
    ],
    rules: [
        {
          test: /\.css$/,
          use: [ 'style-loader', 'css-loader' ]
        },
        {
          test: /\.styl$/,
          use: ['style-loader', 'css-loader', 'stylus-loader'],
        }
      ]
  },
  plugins: [
    // new webpack.LoaderOptionsPlugin({
    //   minimize: true,
    //   debug: false
    // }),
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      beatify:false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress:{
        //screw_ie8: true,
        warnings: false
      },
      comments: false
   }),
   new webpack.optimize.DedupePlugin(),
   new webpack.optimize.AggressiveMergingPlugin()
  ],
  resolve: {
    alias: {
      'react': path.join(__dirname, 'node_modules', 'react')
    },
    extensions: ['', '.js', '.jsx', '.styl']
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  }
};