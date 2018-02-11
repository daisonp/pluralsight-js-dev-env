import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
    debug: true,
    devtool: 'source-map',
    noInfo: false,
    entry: {
        main: path.resolve(__dirname, 'src/index'),
        vendor: path.resolve(__dirname, 'src/vendor')
    },
    target: 'web',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].[chunkhash].js'
    },
    plugins : [
        // Minify JS
        new webpack.optimize.UglifyJsPlugin(),

        //Eliminate duplicate packages when generating bundle
        new webpack.optimize.DedupePlugin(),

        // Create HTML file that includes reference to bundled JS
        new HtmlWebpackPlugin( {
            template : 'src/index.html',
            inject : true,
            minify : {
                removeComments : true,
                collapseWhitespace : true,
                removeRedundantAttributes : true,
                useShortDoctype : true,
                removeEmptyAttributes : true,
                removeStyleLinkTypeAttributes : true,
                keepClosingSlash : true,
                minifyJS : true,
                minifyCSS : true,
                minifyURLs : true
            },
            // Properties you define here are available in index.html
            // using htmlWebpackPlugin.options.varName
            trackJSToken : '9e8146536325479eabfeb2547ac16b42'
        }),

        // Use CommonsChunkPlugin to create separate bundle
        // of vendor libraries so that they're cached separetely.
        new webpack.optimize.CommonsChunkPlugin ({
            name : 'vendor'
        }),

        // Hash the files using MD5 so that their name change when the content changes.
        new WebpackMd5Hash(),

        // Generate an external css file with a hash in the filename
        new ExtractTextPlugin('[name].[contenthash].css')

    ],
    module : {
        loaders : [
            {test: /\.js$/, exclude: /node_modules/, loaders : ['babel']},
            {test: /\.css$/, loader : ExtractTextPlugin.extract('css?sourceMap')}
        ]
    }
}
