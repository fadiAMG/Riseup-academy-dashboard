const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#ffd900',
              '@body-background': '#f0f2f5',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
