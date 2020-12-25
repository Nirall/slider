const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const HtmlPlugin = require('html-webpack-plugin');
const CssExtract = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    bundle: './src/index.ts',
    init: './src/demo-page/init.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 3000
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlPlugin({
      template: 'src/demo-page/index.pug',
      inject: false,
      filename: 'index.html'
    }),
    new CssExtract({
      filename: 'style.css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        options: {
          pretty: true
        }
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.s?css$/,
        use: [
          CssExtract.loader,
          'css-loader',
          'sass-loader'
        ],
        exclude: /node_modules/
      },
      /*
      {
        test: /\.html$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]'
          }
        }
      },
      */
      {
        test: /(?=init.*)\.js$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]'
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  }
};
