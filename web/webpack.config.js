var merge = require('webpack-merge');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');


var ENV = process.env.NODE_ENV || 'dev';
var isProd = ENV === 'production';
var isDev = ENV === 'dev';

console.log(`Running webpack in env: ${ENV}`);

var config = {
  entry: "./src/app.js",
  output: {
    path: __dirname + '/dist',
    publicPath: (isProd) ? '/account' : 'http://localhost:8080/',
    filename: (isProd) ? '[name].[hash].js' : '[name].bundle.js',
    chunkFilename: (isProd) ? '[name].[hash].js' : '[name].bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel"
    }, {
      test: /\.sass/,
      loader: "style!css!sass"
    }, {
      test: /\.css$/,
      loader: "style!css"
    }]
  }
};

config.plugins = [];
config.plugins.push(
  new HtmlWebpackPlugin({
    template: './src/public/index.html',
    inject: 'body',
    baseUrl: isProd ? '/chat/' : '/',
  }),

  new ExtractTextPlugin('[name].[hash].css', {disable: !(isProd)})
);

if (isDev) {
  config = merge.smart(config, {
    module: {
      preLoaders: [
        {test: /.js$/, exclude: [/node_modules/, /\.spec\.js$/], loader: 'isparta-loader'}
      ]
    }
  })
}

config.resolve = {
  alias: {
    env: __dirname + '/src/env/' + ENV + '.js',
  }
};

module.exports = config;