// Este es un archivo de configuración para webpack.
// webpack lo que hace es tomat los archivos js, html y css creados en la carpeta de fronten, los comprime
// y los lleva y los instala en la carpera del backend, de tal manera que son esos ultimos lo que van al servidor
// el proceso requiere inicialmente de esta configuracion y de la ejecucion de webpac para la conversion 
// de dichos archivos mediante el comando $ npx webpack, 
// Sin embargo con ese comando base, el css queda embebido en el JS y su para produccion se busca que el cdd esté
// separadito entonces se debe usar el modulo mini-css-extract-plugin, y para detectar que se está generando el 
// codigo a produccion entonces se hace uso de cross-env

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin= require('mini-css-extract-plugin')
const devMode= process.env.NODE_ENV !=='production'


module.exports={
    // Congigutacion para convertir el js
    entry:'./frontend/app.js',
    output:{
        path:path.join(__dirname,'backend/public'),
        filename:'js/bundle.js'
    },

    // Configuracin mpara convertir el css
    module:{
    rules:[{
        test:/\.css/,
        use:[
            devMode ? 'style-loader': MiniCssExtractPlugin.loader,
            'css-loader'
        ]
    }]
    },

    // configuracion para convertir el HTML
    plugins:[
        new HtmlWebpackPlugin({
            template: './frontend/index.html',
            minify:{
                collapseWhitespace:true,
                removeComments:true,
                removeRedundantAttributes:true,
                removeScriptTypeAttributes:true,
                removeStyleLinkTypeAttributes:true,
                useShortDoctype:true
            }
        }),
        new MiniCssExtractPlugin({
            filename:'css/bundle.css'
        })

    ],
    devtool: 'source-map',
    
}