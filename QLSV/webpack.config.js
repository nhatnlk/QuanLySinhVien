module.exports  = {
    entry:["./main.js"],
    output:{
    path:__dirname, 
    filename: "bundle.js"
    },
    module:{
        loaders: [
            {test:/\.css$/,loader:"style-loader!css-loader"} //Set thuoc tinh de build file css
            ,{test:/\.scss$/,loader: 'style-loader!css-loader!sass-loader'}
            ,{test: /\.(png|jpg|gif|svg)$/, loader:"url-loader?limit=10000&name=images/[hash:12].[ext]"}
        ]
    }
}; 