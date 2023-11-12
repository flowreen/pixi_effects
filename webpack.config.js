const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/index.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: false,
            template: './src/index.html'
        }),
        new CopyPlugin({
            patterns: [
                {from: 'assets', to: 'assets'},
                {from: 'css', to: 'css'},
            ],
        }),
    ],
    devServer: {
        static: path.join(__dirname, 'dist'),
        port: 8080
    }
};
