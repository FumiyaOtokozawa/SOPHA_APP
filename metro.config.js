const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  resolver: {
    // Supabase v1ではポリフィルが少なくて済みます
    extraNodeModules: {
      events: require.resolve('events'),
      stream: require.resolve('readable-stream'),
      url: require.resolve('url'),
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
