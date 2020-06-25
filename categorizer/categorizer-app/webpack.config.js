const path = require('path');

module.exports = {
    context: path.resolve('.'),
    entry: path.resolve('.', 'src', 'index.js'),
    output: {
        path: path.resolve('.', 'public'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: [".js", ".ts"],
    },
    module: {
        rules: [{
            test: /\.(js|ts)$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        },{
            test: /\.css$/i,
            loader: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader',
                options: {
                    modules: true
                }
            }]
        },{
            test: /\.s[ac]ss$/i,
            use: [
                'style-loader',
                'css-loader',
                'sass-loader'
            ]
        }, {
            test: /\.(ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
            loader: 'url-loader',
            options: {
                name: '[hash].[ext]',
                limit: 10000,
            },
        }]
    },
    devServer: {
        contentBase: path.resolve('.', 'public'),
        host: '0.0.0.0',
        port: 9999,
        inline: true,
        liveReload: true,
        hot: false,
        compress: true,
        historyApiFallback: true
    }
}