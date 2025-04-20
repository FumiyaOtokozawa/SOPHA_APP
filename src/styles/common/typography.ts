import {Platform} from 'react-native';

export const typography = {
  fontFamily: Platform.select({
    ios: 'M PLUS 1p',
    android: 'MPLUS1p-Regular',
  }),
  fontFamilyBold: Platform.select({
    ios: 'M PLUS 1p',
    android: 'MPLUS1p-ExtraBold',
  }),
  fontFamilyMedium: Platform.select({
    ios: 'M PLUS 1p',
    android: 'MPLUS1p-Medium',
  }),
};
