const path = require('path');

const dotenv = require('dotenv');
dotenv.config();
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

const environmentVariables = [
  'KAKAO_CLIENT_ID',
  'KAKAO_REDIRECT_URI',
  'SERVER_BASE_URI',
];

const isProduction = process.env.NODE_ENV === 'production';

const stylesHandler = isProduction
  ? MiniCssExtractPlugin.loader
  : 'style-loader';

const config = {
  devServer: {
    open: true,
    host: 'localhost',
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
    new webpack.EnvironmentPlugin(environmentVariables),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules\/(?!(axios|@redux-saga|redux-logger))/,
        use: {
          loader: 'babel-loader',
          options: {
            configFile: './babel.config.json',
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [stylesHandler, 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
      },
    ],
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
    },
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = 'production';

    config.plugins.push(new MiniCssExtractPlugin());

    config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());
  } else {
    config.mode = 'development';
  }
  return config;
};
