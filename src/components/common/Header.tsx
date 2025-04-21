import React from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import {useTheme} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import type {AppTheme} from '../../theme';

type HeaderProps = {
  username?: string;
  onMenuPress: () => void;
};

export const Header: React.FC<HeaderProps> = ({
  username = 'ゲスト',
  onMenuPress,
}) => {
  const theme = useTheme<AppTheme>();

  return (
    <View style={[styles.header, {backgroundColor: theme.colors.background}]}>
      <View style={styles.header__left}>
        <MaterialIcons
          name="account-circle"
          size={48}
          color={theme.colors.primary}
        />
        <Text style={[styles.header__username, {color: theme.colors.text}]}>
          {username}
        </Text>
      </View>
      <MaterialIcons
        name="menu"
        color={theme.colors.text}
        size={24}
        onPress={onMenuPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: Platform.OS === 'ios' ? 52 : 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
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
