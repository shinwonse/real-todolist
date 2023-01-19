const path = require('path');

const dotenv = require('dotenv');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

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
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new webpack.DefinePlugin({
      KAKAO_CLIENT_ID: JSON.stringify(process.env.KAKAO_CLIENT_ID),
      KAKAO_REDIRECT_URI: JSON.stringify(process.env.KAKAO_REDIRECT_URI),
      SERVER_BASE_URI: JSON.stringify(process.env.SERVER_BASE_URI),
      GITHUB_REDIRECT_URL: JSON.stringify(process.env.GITHUB_REDIRECT_URL),
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
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
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
    extensions: ['.js', '.ts'],
  },
};

module.exports = (env) => {
  const { DEV } = env;
  if (DEV) {
    dotenv.config({ path: './dev.env' });
  } else {
    dotenv.config({ path: './.env' });
  }
  if (isProduction) {
    config.mode = 'production';
    config.plugins.push(new MiniCssExtractPlugin());
    config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());
  } else {
    config.mode = 'development';
  }
  return config;
};
