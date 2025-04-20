import {Platform, TextStyle} from 'react-native';

type FontConfig = {
  fontFamily: string;
  fontWeight: TextStyle['fontWeight'];
};

const createFontConfig = (
  family: string,
  weight: TextStyle['fontWeight'],
): FontConfig => ({
  fontFamily: family,
  fontWeight: weight,
});

type Typography = {
  regular: FontConfig;
  bold: FontConfig;
  fontFamily: string;
  fontFamilyBold: string;
  fontWeight: TextStyle['fontWeight'];
  fontWeightBold: TextStyle['fontWeight'];
};

export const typography: Typography = {
  regular: Platform.select<FontConfig>({
    ios: createFontConfig('M PLUS 1p Regular', '400'),
    android: createFontConfig('MPLUS1p-Regular', '400'),
  }) as FontConfig,
  bold: Platform.select<FontConfig>({
    ios: createFontConfig('M PLUS 1p Bold', '700'),
    android: createFontConfig('MPLUS1p-Bold', '700'),
  }) as FontConfig,
  get fontFamily() {
    return this.regular.fontFamily;
  },
  get fontFamilyBold() {
    return this.bold.fontFamily;
  },
  get fontWeight() {
    return this.regular.fontWeight;
  },
  get fontWeightBold() {
    return this.bold.fontWeight;
  },
};
