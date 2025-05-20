const { dependencies } = require('./package.json');
const remotes = require('./remotes.config.js');

module.exports = {
    name: 'host-app',
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
