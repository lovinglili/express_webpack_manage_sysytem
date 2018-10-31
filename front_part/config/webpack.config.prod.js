
const PATH=require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");//抽离出来css
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");//压缩css文件
module.exports={
    mode:"production",
    entry:{
        main:"./src/javascripts/main",
        admin: ['./src/javascripts/admin']
    },
    output:{
        filename:"[name]-[hash:6].js",
        path: PATH.resolve(__dirname,"../dist")
    },
    optimization: {
        minimizer: [
          new OptimizeCSSAssetsPlugin({})
        ]
      },
    
    plugins:[
        new HtmlWebpackPlugin({
            template:"./src/index.html",
            filename:"index.html",
            chunks: ['main']
        }),
        new HtmlWebpackPlugin({
            template: './src/admin.html',
            filename: 'admin.html',
            chunks: ['admin']
        }),
        new CopyWebpackPlugin([{
            from:PATH.resolve(__dirname, '../static'),
            to:PATH.resolve(__dirname,"../dist/static")
        }
    ]),
    new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: "styles/[name]-[hash:6].css" //版本号
    })
    ],
    module:{
        rules:[
            {//
                test: /\.(css|scss)$/,
                use: [ MiniCssExtractPlugin.loader, 'css-loader', { loader: 'sass-loader'} ]
            },
            {
                test:/\.html$/,
                use:[
                    {
                        loader:'string-loader'
                    }
                ]
            },
            {
                test:/\.(png|jpg|gif)$/,
                use:[
                    {
                        loader:"url-loader",
                        options:{
                            limit:8192
                        }
                    }
                ]
            },
            {
                
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env'],
                    plugins: ['@babel/plugin-transform-runtime']
                    }
                }
            }


        ]
    }
}