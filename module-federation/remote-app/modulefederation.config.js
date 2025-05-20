const { dependencies } = require('./package.json');
const remotes = require('./remotes.config.js');

module.exports = {
    name: 'remoteApp',
    exposes: {
        './CheckoutWidget': './src/CheckoutWidget',
    },
    filename: 'remoteEntry.js',
    remotes,
    shared: {
        ...dependencies,
        react: {
            singleton: true,
            requiredVersion: dependencies['react'],
        },
        'react-dom': {
            singleton: true,
            requiredVersion: dependencies['react-dom'],
        },
    },
};
