/**
 * Footer.tsx
 * アプリケーションのフッターナビゲーションを提供するコンポーネント
 * 各ページへの遷移と特殊なAttendボタンのアニメーション機能を備えています
 */
import React, {useRef, useCallback, useMemo} from 'react';
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

// MenuItemをメモ化して不要な再レンダリングを防止
const MenuItem = React.memo<{
  item: FooterMenuItem;
  isActive: boolean;
  onPress: () => void;
  textColor: string;
  theme: AppTheme;
}>(({item, isActive, onPress, textColor, theme}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    if (isActive) {
      Animated.spring(scaleAnim, {
        toValue: 1.2,
        useNativeDriver: true,
        friction: 8,
        tension: 40,
      }).start();
    } else {
      // 非アクティブ状態への変更は簡単なアニメーションにする
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
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
});

export const Footer: React.FC<FooterProps> = ({
  activeTab,
  onTabPress,
  // onAttendPress = () => console.log('Attend pressed'),
}) => {
  const theme = useTheme<AppTheme>();
  const insets = useSafeAreaInsets();
  const footerHeight = useMemo(
    () => (Platform.OS === 'ios' ? 84 : 80) + insets.bottom,
    [insets.bottom],
  );
  const paddingBottomValue = insets.bottom > 0 ? insets.bottom : 0;

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

  const handleTabPress = useCallback(
    (tabKey: string) => {
      if (tabKey === 'attend') {
        // アニメーション中または既に中央にある場合は早期リターン
        if (isAttendAnimating || isAttendCentered) {
          return;
        }
        animateToCenter();
        return;
      }

      // 現在のタブと同じタブを押した場合は何もしない
      if (activeTab === tabKey) {
        return;
      }

      // 親コンポーネントのハンドラーを呼び出し
      onTabPress(tabKey);
    },
    [
      activeTab,
      animateToCenter,
      isAttendAnimating,
      isAttendCentered,
      onTabPress,
    ],
  );

  // オーラのアニメーションスタイル
  const auraStyle = useMemo(
    () => ({
      position: 'absolute' as const,
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      borderRadius: 40,
      zIndex: 0,
      opacity: auraAnim.interpolate({inputRange: [0, 1], outputRange: [0, 1]}),
      transform: [
        {
          scale: auraAnim.interpolate({
            inputRange: [1, 1],
            outputRange: [1, 1.18],
          }),
        },
        {
          rotate: auraAnim.interpolate({
            inputRange: [0, 1],
            outputRange: ['-2deg', '2deg'],
          }),
        },
      ],
      backgroundColor: 'rgba(255, 102, 0, 0.25)',
      shadowColor: 'rgb(225, 102, 108)',
      shadowOpacity: 0.7,
      shadowRadius: 18,
      shadowOffset: {width: 0, height: 0},
    }),
    [auraAnim],
  );

  // メニューアイテムを表示する関数
  const renderMenuItem = useCallback(
    (item: FooterMenuItem) => {
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
    },
    [
      activeTab,
      attendButtonPosition,
      attendButtonScale,
      auraStyle,
      handleTabPress,
      isAttendAnimating,
      isAttendCentered,
      isAuraOn,
      theme,
    ],
  );

  // 事前に計算しておく
  const leftItems = useMemo(
    () => MENU_ITEMS.filter(item => item.position === 'left'),
    [],
  );
  const centerItem = useMemo(
    () => MENU_ITEMS.find(item => item.position === 'center'),
    [],
  );
  const rightItems = useMemo(
    () => MENU_ITEMS.filter(item => item.position === 'right'),
    [],
  );

  const footerStyle = useMemo(
    () => [
      footerStyles.footer,
      footerStyles.footer__background,
      {
        paddingBottom: paddingBottomValue,
        height: footerHeight,
      },
    ],
    [footerHeight, paddingBottomValue],
  );

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
      <View style={footerStyle}>
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
