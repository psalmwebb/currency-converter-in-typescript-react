const path = require("path")
const htmlPlugin = require("html-webpack-plugin")


module.exports = {


    entry:path.join(__dirname,"src","index.tsx"),
    output:{
        path:path.join(__dirname,"public","dist"),
        filename:"bundle.[name].js"
    },

    module:{
        rules:[
            {
                test:/\.(tsx|jsx)$/,
                use:{
                    loader:"babel-loader",
                }
            },
            {
                test:/\.html$/,
                use:{
                    loader:"html-loader"
                }
            },
            {
                test:/\.css$/,
                use:{
                    loader:"style-loader"
                }
            },
            {
                test:/\.css$/,
                use:{
                    loader:"css-loader"
                }
            }
        ]
    },

    plugins:[
      new htmlPlugin({
          template:path.join(__dirname,"public","index.html")
      })
    ],

    resolve:{
        extensions:[".tsx",".ts",".js",".jsx"]
    },

    devServer:{
        port:3000
    }
}