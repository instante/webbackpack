const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// TODO configure the path where you want to place the compiled assets
const outputPath = path.join(__dirname, 'dist');
const manifestPath = path.join(outputPath, 'manifest.json');

function processManifest(manifestData) {
    const output = {};
    for (const asset of manifestData.assets) {
        const name = asset.name;
        const nameWithoutHash = name.replace('.' + manifestData.hash, '');
        output[nameWithoutHash] = name;
    }
    return output;
}

module.exports = {
    devtool: 'source-map',
    entry: {
        script: ['jquery', 'react', 'react-dom', './src/ts/index.ts'],
        style: ['./src/scss/main.scss']
    },
    target: 'web',
    output: {
        filename: 'js/[name].[hash].js',
        path: outputPath
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    'ts-loader'
                ]
            },
            { // sass / scss loader for webpack
                test: /\.(sass|scss)$/,
                loader: ExtractTextPlugin.extract([
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                            import: false,
                            minimize: true,
                            sourceMap: true,
                        }
                    },
                    'sass-loader'
                ])
            },
        ]
    },
    plugins: [
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendor',
        //     minChunks: Infinity
        // }),
        new webpack.NamedModulesPlugin(),
        new ExtractTextPlugin({ // define where to save the file
            filename: 'css/[name].[hash].css',
            allChunks: true,
        }),
        function() {
            this.plugin('done', function(stats) {
                fs.writeFileSync(
                    manifestPath,
                    JSON.stringify(processManifest(stats.toJson()))
                )
            });
        },
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        })
    ]
};
