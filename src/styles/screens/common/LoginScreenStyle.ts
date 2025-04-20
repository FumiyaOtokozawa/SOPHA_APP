import {StyleSheet, Platform, Dimensions} from 'react-native';
import {typography} from '../../common/typography';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
const isSmallDevice = screenHeight < 700;

export const styles = StyleSheet.create({
  loginScreen: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: Platform.OS === 'ios' ? 20 : 16,
    overflow: 'hidden',
  },
  loginScreen__logo: {
    alignItems: 'center',
    marginTop: isSmallDevice ? 40 : Platform.OS === 'ios' ? 60 : 48,
    width: '100%',
    maxHeight: screenHeight * 0.3,
  },
  loginScreen__logo__image: {
    width: Math.min(screenWidth * 0.5, 240),
    height: Math.min(screenWidth * 0.5, 240),
  },
  loginScreen__container: {
    width: '100%',
    maxWidth: Math.min(400, screenWidth * 0.9),
    padding: isSmallDevice ? 16 : Platform.OS === 'ios' ? 24 : 20,
    zIndex: 1,
  },
  loginScreen__form: {
    width: '100%',
    paddingHorizontal: isSmallDevice ? 8 : Platform.OS === 'ios' ? 16 : 12,
  },
  loginScreen__form__title: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: typography.fontFamilyBold,
    fontWeight: typography.fontWeightBold,
  },
  loginScreen__form__description: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeight,
  },
  loginScreen__input: {
    marginBottom: isSmallDevice ? 12 : Platform.OS === 'ios' ? 16 : 14,
    backgroundColor: 'transparent',
    height: isSmallDevice ? 44 : 48,
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeight,
  },
  loginScreen__input__content: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    paddingHorizontal: 16,
    borderRadius: 8,
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeight,
  },
  loginScreen__input__outline: {
    borderColor: 'rgba(234, 234, 234, 0.3)',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
  },
  loginScreen__input__outline__focused: {
    borderColor: 'rgb(84, 98, 224)',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
  },
  loginScreen__button: {
    marginTop: isSmallDevice ? 16 : Platform.OS === 'ios' ? 24 : 20,
    height: isSmallDevice ? 44 : 48,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  loginScreen__button__label: {
    fontSize: 16,
    letterSpacing: 1,
    fontFamily: typography.fontFamilyBold,
    fontWeight: typography.fontWeightBold,
  },
  loginScreen__button__content: {
    height: '100%',
  },
  loginScreen__links: {
    marginTop: isSmallDevice ? 24 : Platform.OS === 'ios' ? 32 : 28,
    gap: isSmallDevice ? 12 : Platform.OS === 'ios' ? 16 : 14,
    alignItems: 'center',
  },
  loginScreen__links__item: {
    padding: isSmallDevice ? 6 : 8,
  },
  loginScreen__links__text: {
    fontSize: isSmallDevice ? 13 : 14,
    opacity: 0.8,
    fontFamily: typography.fontFamilyBold,
    fontWeight: typography.fontWeightBold,
  },
});
