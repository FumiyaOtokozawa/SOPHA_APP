import {StyleSheet, Platform} from 'react-native';
import {typography} from '../../common/typography';

export const styles = StyleSheet.create({
  loginScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Platform.OS === 'ios' ? 20 : 16,
    overflow: 'hidden',
  },
  loginScreen__container: {
    width: '100%',
    maxWidth: 400,
    padding: Platform.OS === 'ios' ? 24 : 20,
    zIndex: 1,
  },
  loginScreen__logo: {
    alignItems: 'center',
  },
  loginScreen__logo__image: {
    width: 300,
    height: 300,
  },
  loginScreen__form: {
    width: '100%',
    paddingHorizontal: Platform.OS === 'ios' ? 16 : 12,
  },
  loginScreen__input: {
    marginBottom: Platform.OS === 'ios' ? 16 : 14,
    backgroundColor: 'transparent',
    height: 48,
    fontFamily: typography.fontFamily,
  },
  loginScreen__input__content: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    paddingHorizontal: 16,
    borderRadius: 8,
    fontFamily: typography.fontFamily,
  },
  loginScreen__input__outline: {
    borderColor: 'rgba(234, 234, 234, 0.3)',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
  },
  loginScreen__button: {
    marginTop: Platform.OS === 'ios' ? 24 : 20,
    height: 40,
  },
  loginScreen__links: {
    marginTop: Platform.OS === 'ios' ? 32 : 28,
    gap: Platform.OS === 'ios' ? 16 : 14,
    alignItems: 'center',
  },
  loginScreen__links__item: {
    padding: 8,
  },
  loginScreen__links__text: {
    fontSize: 14,
    opacity: 0.8,
    fontFamily: typography.fontFamily,
  },
});
