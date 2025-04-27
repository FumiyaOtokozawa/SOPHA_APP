import {StyleSheet} from 'react-native';

export const footerStyles = StyleSheet.create({
  footer: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  footer__background: {
    backgroundColor: 'rgba(28, 29, 33, 0.95)',
  },
  footer__content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  footer__side: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  footer__item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    height: 56,
  },
  footer__itemContent: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  footer__icon: {
    marginBottom: 4,
  },
  footer__label: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  footer__centerItem: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -18,
    zIndex: 100,
  },
  footer__centerButtonWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  footer__centerButton: {
    width: '100%',
    height: '100%',
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    shadowColor: 'rgba(255, 255, 255, 0.1)',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.1)',
    zIndex: 99,
  },
});
