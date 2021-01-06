
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = false;
const isDevelopment = !isProduction;

module.exports = {
    entry: path.resolve(__dirname,"src/index.tsx"),
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
                test: /\.(js|ts)x?$|/,
                exclude: /node_modules/,
                use: "babel-loader"
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    }

}