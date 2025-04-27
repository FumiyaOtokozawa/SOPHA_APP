import React, {useRef} from 'react';
import {
  View,
  Text,
  Pressable,
  Platform,
  Animated,
  // TouchableWithoutFeedback,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import type {AppTheme} from '../../theme';
import {footerStyles} from '../../styles/common/FooterStyle';
import {useAttendButtonAnimation} from './animations/AttendButtonAnimation';

// const __DEV__ = process.env.NODE_ENV !== 'production';

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

  React.useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: isActive ? 1.2 : 1,
      useNativeDriver: true,
      friction: 8,
      tension: 40,
    }).start();
  }, [isActive, scaleAnim]);

  if (item.position === 'center') {
    return (
      <View style={footerStyles.footer__centerItem}>
        <View style={footerStyles.footer__centerButtonWrapper}>
          <Pressable
            style={[
              footerStyles.footer__centerButton,
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
    <Pressable style={footerStyles.footer__item} onPress={onPress}>
      <Animated.View
        style={[
          footerStyles.footer__itemContent,
          {
            transform: [{scale: scaleAnim}],
          },
        ]}>
        <MaterialIcons
          name={item.icon}
          size={24}
          color={textColor}
          style={footerStyles.footer__icon}
        />
        <Text style={[footerStyles.footer__label, {color: textColor}]}>
          {' '}
          {item.label}{' '}
        </Text>
      </Animated.View>
    </Pressable>
  );
};

export const Footer: React.FC<FooterProps> = ({
  activeTab,
  onTabPress,
  // onAttendPress = () => console.log('Attend pressed'),
}) => {
  const theme = useTheme<AppTheme>();
  const insets = useSafeAreaInsets();
  const footerHeight = Platform.OS === 'ios' ? 84 : 80 + insets.bottom;
  const paddingBottomValue = insets.bottom > 0 ? insets.bottom : 0;
  const navigation = useNavigation();

  // Attendボタンアニメーション用カスタムフック
  const {
    isAttendAnimating,
    isAttendCentered,
    attendButtonPosition,
    attendButtonScale,
    animateToCenter,
    // animateToOrigin,
    isAuraOn,
    // setIsAuraOn,
    auraAnim,
  } = useAttendButtonAnimation(footerHeight);

  const handleTabPress = (tabKey: string) => {
    if (tabKey === 'attend') {
      animateToCenter();
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

  // const handleOverlayPress = () => {
  //   if (isAttendAnimating || !isAttendCentered) return;
  //   animateToOrigin(onAttendPress);
  // };

  // オーラのアニメーションスタイル
  const auraStyle = {
    position: 'absolute' as const,
    left: 0, // ラッパーの左端に合わせる
    right: 0, // ラッパーの右端に合わせる
    top: 0, // ラッパーの上端に合わせる
    bottom: 0, // ラッパーの下端に合わせる
    borderRadius: 40, // 丸み（ラッパーの形状に合わせる）
    zIndex: 0, // ボタンの下に表示
    opacity: auraAnim.interpolate({inputRange: [0, 1], outputRange: [0, 1]}), // 揺らぎで透明度を変化
    transform: [
      {
        scale: auraAnim.interpolate({
          inputRange: [1, 1],
          outputRange: [1, 1.18],
        }), // 揺らぎで大きさを変化
      },
      {
        rotate: auraAnim.interpolate({
          inputRange: [0, 1],
          outputRange: ['-2deg', '2deg'],
        }), // 揺らぎで回転
      },
    ],
    backgroundColor: 'rgba(255, 102, 0, 0.25)', // 炎色の半透明
    shadowColor: 'rgb(225, 102, 108)', // 赤系の影色
    shadowOpacity: 0.7, // 影の濃さ
    shadowRadius: 18, // 影の広がり
    shadowOffset: {width: 0, height: 0}, // 影の位置
  };

  const renderMenuItem = (item: FooterMenuItem) => {
    const isActive =
      item.position === 'center' ? false : activeTab === item.key;
    const textColor = isActive
      ? theme.colors.primary
      : 'rgba(255, 255, 255, 0.5)';

    if (item.position === 'center') {
      return (
        <View key={item.key} style={footerStyles.footer__centerItem}>
          <View style={footerStyles.footer__centerButtonWrapper}>
            {isAuraOn && (
              <Animated.View pointerEvents="none" style={auraStyle} />
            )}
            <Pressable
              style={[
                footerStyles.footer__centerButton,
                {backgroundColor: theme.colors.primary},
              ]}
              onPress={() => handleTabPress(item.key)}
              disabled={isAttendAnimating || isAttendCentered}>
              <Animated.View
                style={{
                  transform: [
                    {translateX: attendButtonPosition.x},
                    {translateY: attendButtonPosition.y},
                    {scale: attendButtonScale},
                  ],
                }}>
                <MaterialIcons
                  name={item.icon}
                  size={32}
                  color={theme.colors.text}
                />
              </Animated.View>
            </Pressable>
          </View>
        </View>
      );
    }

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
    <>
      {/* Aura ON/OFF切り替えボタン（開発環境のみ）
      {__DEV__ && (
        <View
          style={{
            position: 'absolute',
            left: 20,
            bottom: footerHeight + 20,
            zIndex: 200,
          }}>
          <Pressable
            style={{
              backgroundColor: isAuraOn
                ? 'rgb(225, 102, 108)'
                : 'rgb(84, 98, 224)',
              paddingHorizontal: 18,
              paddingVertical: 8,
              borderRadius: 20,
            }}
            onPress={() => setIsAuraOn(v => !v)}>
            <Text style={{color: '#fff', fontWeight: 'bold'}}>
              オーラ {isAuraOn ? 'ON' : 'OFF'}
            </Text>
          </Pressable>
        </View>
      )}
      {isAttendCentered && (
        <TouchableWithoutFeedback onPress={handleOverlayPress}>
          <View style={footerStyles.overlay} />
        </TouchableWithoutFeedback>
      )} */}
      <View
        style={[
          footerStyles.footer,
          footerStyles.footer__background,
          {
            paddingBottom: paddingBottomValue,
            height: footerHeight,
          },
        ]}>
        <View style={footerStyles.footer__content}>
          <View style={footerStyles.footer__side}>
            {leftItems.map(item => renderMenuItem(item))}
          </View>
          {centerItem && renderMenuItem(centerItem)}
          <View style={footerStyles.footer__side}>
            {rightItems.map(item => renderMenuItem(item))}
          </View>
        </View>
      </View>
    </>
  );
};
