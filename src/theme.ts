import {MD3LightTheme as DefaultTheme} from 'react-native-paper';
import type {MD3Theme} from 'react-native-paper';

export type AppTheme = MD3Theme & {
  colors: typeof DefaultTheme.colors & {
    text: string;
    success: string;
  };
};

export const theme: AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(84, 98, 224)',
    error: 'rgb(225, 102, 108)',
    success: 'rgb(108, 186, 162)',
    background: 'rgb(36, 37, 41)',
    text: 'rgb(234, 234, 234)',
  },
  fonts: {
    ...DefaultTheme.fonts,
  },
};
