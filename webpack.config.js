const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const src = './src/js';
const dist = './docs/js';

module.exports = {
  entry: `${src}/index.js`,

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, dist),
    publicPath: dist,
  },

  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },

  plugins: [
    new VueLoaderPlugin(),
  ],

  resolve: {
    extensions: ['.js', '.jsx', '.vue', '.scss'],

    alias: {
      vue$: 'vue/dist/vue.esm.js',
      scss: path.resolve(__dirname, './src/scss/'),
    },
  },
};
