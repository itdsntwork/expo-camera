// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, {
  // [Web-only]: Enables CSS support in Metro.
  isCSSEnabled: true,
});

// module.exports = config;

const extraNodeModules = {
  'rn-camera': path.resolve(__dirname + '/../src'),
};
const watchFolders = [
  path.resolve(__dirname + '/../src')
];

module.exports = {
  ...config,  
  resolver: {
    extraNodeModules
  },
  watchFolders,
};
