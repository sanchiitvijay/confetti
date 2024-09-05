const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = function override(config, env) {
  const firebaseApiKey = process.env.REACT_APP_FIREBASE_API_KEY;
  const firebaseAuthDomain = process.env.REACT_APP_FIREBASE_AUTH_DOMAIN;
  const firebaseProjectId = process.env.REACT_APP_FIREBASE_PROJECT_ID;
  const firebaseStorageBucket = process.env.REACT_APP_FIREBASE_STORAGE_BUCKET;
  const firebaseMessagingSenderId = process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID;
  const firebaseAppId = process.env.REACT_APP_FIREBASE_APP_ID;

  config.plugins.push(
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public/firebase-messaging-sw.js', to: 'firebase-messaging-sw.js' },
      ],
    })
  );

  config.plugins.push({
    apply: (compiler) => {
      compiler.hooks.afterEmit.tap('AfterEmitPlugin', (compilation) => {
        const swFile = compilation.assets['firebase-messaging-sw.js'];

        if (swFile) {
          const swContent = swFile.source();
          const replacedContent = swContent
            .replace('REACT_APP_FIREBASE_API_KEY', firebaseApiKey)
            .replace('REACT_APP_FIREBASE_AUTH_DOMAIN', firebaseAuthDomain)
            .replace('REACT_APP_FIREBASE_PROJECT_ID', firebaseProjectId)
            .replace('REACT_APP_FIREBASE_STORAGE_BUCKET', firebaseStorageBucket)
            .replace('REACT_APP_FIREBASE_MESSAGING_SENDER_ID', firebaseMessagingSenderId)
            .replace('REACT_APP_FIREBASE_APP_ID', firebaseAppId);
          swFile.source = () => replacedContent;
        } else {
          console.error('firebase-messaging-sw.js not found in compilation assets.');
        }
      });
    },
  });

  return config;
};
