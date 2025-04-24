import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Platform,
  Animated,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import type {AppTheme} from '../../theme';

type FooterMenuItem = {
  key: string;
  label: string;
  icon: string;
  position: 'left' | 'center' | 'right';
};

const MENU_ITEMS: FooterMenuItem[] = [
  {key: 'home', label: 'HOME', icon: 'chair', position: 'left'},
  {key: 'event', label: 'EVENT', icon: 'local-pizza', position: 'left'},
  {key: 'attend', label: 'ATTEND', icon: 'rocket', position: 'center'},
  {key: 'sofix', label: 'SOFIX', icon: 'event', position: 'right'},
  {key: 'ciz', label: 'CIZ', icon: 'copyright', position: 'right'},
];

type FooterProps = {
  activeTab: string;
  onTabPress: (tabKey: string) => void;
  onAttendPress?: () => void;
};

const MenuItem: React.FC<{
  item: FooterMenuItem;
  isActive: boolean;
  onPress: () => void;
  textColor: string;
  theme: AppTheme;
}> = ({item, isActive, onPress, textColor, theme}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: isActive ? 1.2 : 1,
      useNativeDriver: true,
      friction: 8,
      tension: 40,
    }).start();
  }, [isActive, scaleAnim]);

  if (item.position === 'center') {
    return (
      <View style={styles.footer__centerItem}>
        <View style={styles.footer__centerButtonWrapper}>
          <Pressable
            style={[
              styles.footer__centerButton,
              {backgroundColor: theme.colors.primary},
            ]}
            onPress={onPress}>
            <MaterialIcons
              name={item.icon}
              size={32}
              color={theme.colors.text}
            />
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <Pressable style={styles.footer__item} onPress={onPress}>
      <Animated.View
        style={[
          styles.footer__itemContent,
          {
            transform: [{scale: scaleAnim}],
          },
        ]}>
        <MaterialIcons
          name={item.icon}
          size={24}
          color={textColor}
          style={styles.footer__icon}
        />
        <Text style={[styles.footer__label, {color: textColor}]}>
          {item.label}
        </Text>
      </Animated.View>
    </Pressable>
  );
};

export const Footer: React.FC<FooterProps> = ({
  activeTab,
  onTabPress,
  onAttendPress = () => console.log('Attend pressed'),
}) => {
  const theme = useTheme<AppTheme>();
  const insets = useSafeAreaInsets();
  const footerHeight = Platform.OS === 'ios' ? 84 : 80 + insets.bottom;
  const paddingBottomValue = insets.bottom > 0 ? insets.bottom : 0;
  const navigation = useNavigation();

  const handleTabPress = (tabKey: string) => {
    if (tabKey === 'attend') {
      onAttendPress();
      return;
    }

    onTabPress(tabKey);
    switch (tabKey) {
      case 'home':
        navigation.navigate('Home');
        break;
      case 'event':
        navigation.navigate('Event');
        break;
      case 'sofix':
        navigation.navigate('Sofix');
        break;
      case 'ciz':
        navigation.navigate('Ciz');
        break;
    }
  };

  const renderMenuItem = (item: FooterMenuItem) => {
    const isActive =
      item.position === 'center' ? false : activeTab === item.key;
    const textColor = isActive
      ? theme.colors.primary
      : 'rgba(255, 255, 255, 0.5)';

    return (
      <MenuItem
        key={item.key}
        item={item}
        isActive={isActive}
        onPress={() => handleTabPress(item.key)}
        textColor={textColor}
        theme={theme}
      />
    );
  };

  const leftItems = MENU_ITEMS.filter(item => item.position === 'left');
  const centerItem = MENU_ITEMS.find(item => item.position === 'center');
  const rightItems = MENU_ITEMS.filter(item => item.position === 'right');

  return (
    <View
      style={[
        styles.footer,
        styles.footer__background,
        {
          paddingBottom: paddingBottomValue,
          height: footerHeight,
        },
      ]}>
      <View style={styles.footer__content}>
        <View style={styles.footer__side}>
          {leftItems.map(item => renderMenuItem(item))}
        </View>
        {centerItem && renderMenuItem(centerItem)}
        <View style={styles.footer__side}>
          {rightItems.map(item => renderMenuItem(item))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});
