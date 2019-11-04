const path = require('path');

module.exports = {
  entry: './src/js/index.js',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
    },
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'docs/js'),
    publicPath: 'docs/js',
  },
  devServer: {
    open: true,
  },
};
