const path = require("path");
const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");
const glob = require("glob");

var paths = {};

paths.client = path.resolve("./src/client/");
paths.scripts = path.join(paths.client, "scripts");
paths.styles = path.join(paths.client, "styles");

paths.output = path.join(__dirname, "./build/client/");

var entries = {
    "vendor_bundle": path.join(paths.scripts, "Vendor.ts"),
    "angular_bundle": path.join(paths.scripts, "Angular.ts"),
    "styles_bundle": path.join(paths.styles, "main.scss")
};

module.exports = {
    context: __dirname,
    entry: entries,
    output: {
        path: paths.output,
        library: "[name]",
        filename: "js/[name].js"
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loaders: ["ts-loader", "import-glob-loader"]
            },
            {
                test: /\.scss$/,
                loaders: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.(html)$/,
                loaders: ["html-loader"]
            },
            {
                test: /\.json$/,
                loaders: ["json-loader"]
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)/,
                loader: "file-loader?name=fonts/[name].[ext]"
            },
            {
                test: /\.(jpg|jpeg|png|bmp|gif|tiff)/,
                loader: "file-loader?name=images/[name].[ext]"
            }
        ]
    },
    ts: {
        configFilePath: paths.client + "/tsconfig.json"
    },
    resolve: {
        extensions: ["", ".js", ".ts"]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor_bundle",
            minChunks: Infinity
        }),
        
        new CopyPlugin([
            {
                context: paths.client,
                from: "**/*",
                ignore: [
                    "scripts/**/*",
                    "styles/**/*",
                    "tsconfig.json"
                ]
            }
        ])
    ]
};