const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    'featured-products': [
      './src/scss/featured-products.scss'
    ]
  },
  output: {
    path: path.resolve(__dirname, 'assets'),
    filename: '[name].js',
    clean: false
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: { presets: [['@babel/preset-env', { targets: 'defaults' }]] }
        }
      },
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { url: false } },
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ]
};
