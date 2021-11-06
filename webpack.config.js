const path = require('path')
module.exports = {
    entry: './src/mod.ts',
    mode: 'production',
    experiments: {
        outputModule: true
    },
    output: {
        filename: 'mod.js',
        path: __dirname,
        library: {
            type: 'module'
        },
        module: true
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    }
}