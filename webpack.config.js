const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
// const webpackUglifyJsPlugin = require('webpack-uglify-js-plugin');

const extractSass = new ExtractTextPlugin({
  filename: "wp-content/themes/gw-base/assets/css/[name].css",
  allChunks: true
});

const path = require('path');

const config = {
	context: path.resolve(__dirname),
	devtool: 'source-map inline-source-map',
	entry: [
		'./src/scss/main.scss',
		'./src/js/main.js'
	],
	output: {
		filename: 'wp-content/themes/gw-base/assets/js/[name].js'
	},
	plugins: [
		extractSass,
    // new UglifyJSPlugin({
    //   extractComments: true
    // })
	],
	module: {
    loaders: [
      {
        test: /\.(otf|eot|ttf|woff|woff2)$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      },
      {
        test: /\.(png|jpg|gif|ico)$/,
        loader: 'file-loader?name=images/[name].[ext]'
      }
    ],
		rules: [{
      test: /\.scss$/,
      use: extractSass.extract({
        use: [{
            loader: "css-loader", options: {
            	// sourceMap: true,
              minimize: true
            }
        }, {
            loader: "sass-loader", options: {
            	sourceMap: true
            }
        }],
        // use style-loader in development
        fallback: "style-loader"
      })
    }]
	},
  resolve: {
    modules: [
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'src/js'),
      path.resolve(__dirname, 'src/scss'),
      path.resolve(__dirname, 'node_modules')
    ],
    alias: {
      'waypoints': 'waypoints/lib'
    },
    extensions: ['.js', '.json', '.jpg', '.png', '.svg', '.sass', '.scss', '.css'],
  }

};

module.exports = config;