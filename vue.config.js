module.exports = {
	chainWebpack: (config) => {
		config.module
			.rule('eslint')
			.use('eslint-loader')
			.options({ fix: true });

		config.plugin('html').tap((args) => {
			args[0].title = 'Buscador de CEP';
			return args;
		});
	},
	devServer: {
		host: '0.0.0.0',
		hot: true,
		disableHostCheck: true,
	},
};
