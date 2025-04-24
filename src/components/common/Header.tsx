import React from 'react';
import {View, Text, StyleSheet, Platform, Alert} from 'react-native';
import {useTheme} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import type {AppTheme} from '../../theme';

type HeaderProps = {
  username?: string;
  onMenuPress?: () => void;
};

export const Header: React.FC<HeaderProps> = ({
  username = 'ゲスト',
  onMenuPress,
}) => {
  const theme = useTheme<AppTheme>();
  const insets = useSafeAreaInsets();
  const headerHeight = Platform.OS === 'ios' ? 70 : 76 + insets.top;
  const paddingTopValue = insets.top > 0 ? insets.top + 8 : 8;
  const navigation = useNavigation();

  const handleLogout = () => {
    Alert.alert('ログアウト', 'ログアウトしてもよろしいですか？', [
      {
        text: 'キャンセル',
        style: 'cancel',
      },
      {
        text: 'ログアウト',
        style: 'destructive',
        onPress: () => {
          // ログアウト処理
          // TODO: 実際のログアウト処理を実装
          console.log('ログアウトしました');
          navigation.navigate('Login');
        },
      },
    ]);
  };

  return (
    <View
      style={[
        styles.header,
        styles.header__background,
        {
          paddingTop: paddingTopValue,
          height: headerHeight,
        },
      ]}>
      <View style={styles.header__left}>
        <MaterialIcons
          name="account-circle"
          size={60}
          color={theme.colors.primary}
          onPress={onMenuPress}
        />
        <Text style={[styles.header__username, {color: theme.colors.text}]}>
          {username}
        </Text>
      </View>
      <MaterialIcons
        name="logout"
        size={24}
        color={theme.colors.error}
        onPress={handleLogout}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  header__background: {
    backgroundColor: 'rgba(28, 29, 33, 0.95)',
  },
  header__left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  header__username: {
    fontSize: 16,
    fontWeight: '500',
  },
});
