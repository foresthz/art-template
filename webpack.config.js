const path = require('path');
const webpack = require('webpack');
const packageInfo = require('./package.json');
const version = packageInfo.version;

console.info(`process.env.NODE_ENV: ${process.env.NODE_ENV}`);
// console.info(`process.env.PATH: ${process.env.PATH}`);

if(process.env.NODE_ENV === 'production') {
    console.info('in production');
} else {
    console.info('not in production');
}

module.exports = {
    target: 'web',
    entry: {
        'template-web': path.resolve(__dirname, 'lib', 'index')
    },
    output: {
        path: path.resolve(__dirname, 'lib'),
        filename: '[name].js',
        library: 'template',
        libraryTarget: 'umd'
    },
    node: {
        'fs': 'empty',
        'path': 'empty',
        'process': false
    },
    resolve: {
        alias: {
            'html-minifier': 'node-noop'
        }
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: [{
                loader: 'eslint-loader'
            }]
        }]
    },
    devtool: 'source-map',
    plugins: [
        new webpack.BannerPlugin(`art-template@${version} for browser | https://github.com/aui/art-template`),
        new webpack.optimize.ModuleConcatenationPlugin(),
        process.env.NODE_ENV === 'production' ? new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                screw_ie8: false
            },
            mangle: {
                screw_ie8: false
            },
            output: {
                screw_ie8: false
            }
        }) : () => {}
    ]
};