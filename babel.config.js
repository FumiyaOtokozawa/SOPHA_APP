module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          events: 'events',
          stream: 'readable-stream',
        },
      },
    ],
  ],
};
