import React from 'react';
import {View, Text, StyleSheet, Platform, Alert, Image} from 'react-native';
import {useTheme} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import type {AppTheme} from '../../theme';
import {useAuth} from '../../contexts/AuthContext';

type HeaderProps = {
  onMenuPress?: () => void;
};

export const Header: React.FC<HeaderProps> = ({onMenuPress}) => {
  const theme = useTheme<AppTheme>();
  const insets = useSafeAreaInsets();
  const headerHeight = Platform.OS === 'ios' ? 70 : 76 + insets.top;
  const paddingTopValue = insets.top > 0 ? insets.top + 8 : 8;
  const {logout, user, userInfo} = useAuth();

  // ユーザー名の表示優先順位
  // 1. myoji + namae
  // 2. last_nm + first_nm
  // 3. メールアドレスの@前
  const getDisplayName = () => {
    if (userInfo?.myoji && userInfo?.namae) {
      return `${userInfo.myoji} ${userInfo.namae}`;
    } else if (userInfo?.last_nm && userInfo?.first_nm) {
      return `${userInfo.last_nm} ${userInfo.first_nm}`;
    } else if (user?.email) {
      return user.email.split('@')[0];
    }
    return 'ゲスト';
  };

  const displayName = getDisplayName();
  const hasEnglishName = userInfo?.last_nm && userInfo?.first_nm;
  const englishName = hasEnglishName
    ? `${userInfo?.last_nm} ${userInfo?.first_nm}`
    : '';

  const handleLogout = () => {
    Alert.alert('ログアウト', 'ログアウトしてもよろしいですか？', [
      {
        text: 'キャンセル',
        style: 'cancel',
      },
      {
        text: 'ログアウト',
        style: 'destructive',
        onPress: async () => {
          try {
            await logout();
            console.log('ログアウトしました');
          } catch (error) {
            console.error('ログアウトエラー:', error);
          }
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
        {userInfo?.icon_url ? (
          <Image
            source={{uri: userInfo.icon_url}}
            style={styles.header__avatar}
            resizeMode="cover"
          />
        ) : (
          <MaterialIcons
            name="account-circle"
            size={56}
            color={theme.colors.primary}
            onPress={onMenuPress}
          />
        )}
        <View style={styles.header__nameContainer}>
          <Text style={[styles.header__username, {color: theme.colors.text}]}>
            {displayName}
          </Text>
          {hasEnglishName && userInfo?.myoji && userInfo?.namae && (
            <Text style={styles.header__englishName}>{englishName}</Text>
          )}
        </View>
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
  header__nameContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  header__username: {
    fontSize: 16,
    fontWeight: '500',
  },
  header__englishName: {
    fontSize: 12,
    color: 'rgba(234, 234, 234, 0.6)',
    marginTop: 2,
  },
  header__avatar: {
    width: 52,
    height: 52,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: 'rgb(84, 98, 224)',
  },
});
