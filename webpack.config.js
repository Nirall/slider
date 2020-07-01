const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin").CleanWebpackPlugin;
const cssExtract = require("mini-css-extract-plugin");

module.exports = {
    entry: "./src/index.ts",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
    plugins: [
        new CleanWebpackPlugin(),
        new cssExtract({
            filename: "style.css",
        }),
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.s?css$/,
                use: [
                    cssExtract.loader,
                    "css-loader",
                    "sass-loader",
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.html$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]",
                    }
                }
            },
        ]
    },
    resolve: {
        extensions: [ '.ts', '.tsx', '.js' ]
    }
}