
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = false;
const isDevelopment = !isProduction;

module.exports = {
    entry: "./src/index.tsx",
    mode: 'development',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "index.js",
        libraryTarget: "umd",
        library: "react-date-picker"
    },
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"]
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: "style.css" })
    ],
    optimization: {
        minimize: true,
        usedExports: true,
        sideEffects: true
    },
    externals: {
        lodash: {
            commonjs: 'lodash',
            commonjs2: 'lodash',
            amd: 'lodash',
            umd: 'lodash',
            root: '_',
        },
        react: {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react',
        },
        'react-dom': {
            root: 'ReactDOM',
            commonjs2: 'react-dom',
            commonjs: 'react-dom',
            amd: 'react-dom'
        },
    },
    module: {
        rules: [

            {
                test: /\.css$/i,
                use: [{
                    loader: MiniCssExtractPlugin.loader, options: {
                        publicPath: 'dist'
                    }
                }, {
                    loader: 'css-loader',
                    options: {
                        modules: false,
                        // minimize:true,
                        // importLoaders:1
                    }

                }],
            },

            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: '/node_modules/'
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        cacheDirectory: true,
                        cacheCompression: false,
                        envName: isProduction ? "production" : "development"
                    }
                }
            }
        ]
    }

}