//require our dependencies
var path = require('path')
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')

module.exports = {
	entry:{
		app: './static/index.js',
		chatroom: './chatroom/static/index.js',
		linreg: './linreg/static/index.js',
		logreg: './logreg/static/index.js'
	},

	output: {
		path: path.resolve('./static/bundles/'),
		filename: '[name]-[hash].js'
	},

	plugins: [
		//tells webpack where to store data about your bundles.
		new BundleTracker({filename: './webpack-stats.json'}),

		//makes jQuery available in every module
		new webpack.ProvidePlugin({ 
		$: 'jquery',
		jQuery: 'jquery',
		'window.jQuery': 'jquery' 
		})
	],
	
	module: {
		loaders: [
			//a regexp that tells webpack use the following loaders on all 
			//.js and .jsx files
			{
				test: /\.jsx?$/, 
				//we definitely don't want babel to transpile all the files in 
				//node_modules. That would take a long time.
				exclude: /node_modules/, 
				//use the babel loader 
				//loader: 'babel-loader'
                loader: 'babel-loader',
                query:
                    {
                        presets:['react']
                    }
			}
		]
	},
	resolve: {
        modules: ['node_modules'],
        //tells webpack where to look for modules
        //extensions that should be used to resolve modules
        extensions: ['.js', '.jsx'] 
    }
}

