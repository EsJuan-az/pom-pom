const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebPackPlugin = require('optimize-css-assets-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')


module.exports = {
    mode: 'development',
    optimization: {
        minimizer: [
            new OptimizeCssAssetsWebPackPlugin()
        ]
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /styles\.css$/i,
                use: [
                    'style-loader',
                    'css-loader',
                ]
            },
            {
                test: /styles\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ]
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    sources: false,
                    minimize: false
                }
            },
            {
                test: /\.(png|svg|jpg|gif|ico)$/,
                loader: 'file-loader',
                options: {
                    esModule: false,
                    name: 'assets/[name].[ext]',
                }
            }

        ]
    },
    output: {
        clean: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            ignoreOrder: false
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: './src/assets/',
                    to: './assets/',
                }
            ]
        })
    ]
}