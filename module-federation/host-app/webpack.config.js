const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const { ModuleFederationPlugin } = require('@module-federation/enhanced/webpack');

const mfConfig = require('./modulefederation.config.js');

// Environment
const currentEnv = process.env.NODE_ENV || 'development';
const isDev = currentEnv === "development";

// .env
const envFile = `.env.${currentEnv}`;

if (fs.existsSync(envFile)) {
    dotenv.config({ path: envFile });
} else {
    console.warn(`[webpack] ${envFile} not found. Using default environment variables.`);
}

// Plugins
const plugins = [
    new HtmlWebpackPlugin({
        template: './index.html',
        filename: 'index.html',
        minify: !isDev,
    }),
    new ModuleFederationPlugin(mfConfig),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(currentEnv),
        'process.env.API_URL': JSON.stringify(process.env.API_URL),
    }),
];

// Production-only: MiniCssExtractPlugin
if (!isDev) {
    plugins.push(
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        })
    );
}

module.exports = {
    entry: './src/index.ts',
    mode: currentEnv,
    devtool: isDev ? 'source-map' : false,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: isDev ? '[name].js' : '[name].[contenthash].js',
        publicPath: 'auto',
        clean: true,
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                ],
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
        ],
    },
    plugins,
    ...(isDev ? {
        devServer: {
            port: Number(process.env.PORT) || 3000,
            historyApiFallback: true,
            hot: true,
            open: true,
        },
    } : {}),
};
