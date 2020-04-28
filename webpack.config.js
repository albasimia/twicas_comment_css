'use strict'

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')
const glob = require("glob")

// base config
const SRC = './src/scss'
const DEST = './public/css'

const BASE_DIR = '/'

const entries = {}
glob.sync("*.scss", {
        cwd: SRC
    })
    .map(function (key) {
        entries[path.basename(key, '.scss') + '.css'] = path.resolve(SRC, key);
    });

module.exports = {
    // エントリーファイル
    entry: entries,
    // 出力するディレクトリ・ファイル名などの設定
    output: {
        path: path.resolve(__dirname, DEST + BASE_DIR),
        filename: '[name]',
        publicPath: BASE_DIR,
    },
    module: {
        // 各ファイル形式ごとのビルド設定
        rules: [{
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                use: [{
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                        }
                    },
                    'postcss-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sassOptions: {
                                includePaths: [`${SRC}/scss`],
                                outputStyle: 'expanded'
                            }
                        },
                    }
                ]
            })
        }]
    },
    // キャシュ有効化
    cache: true,

    plugins: [
        // cssを出力
        new ExtractTextPlugin('[name]')
    ],
}