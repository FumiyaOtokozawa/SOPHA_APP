import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';
import type {AppTheme} from '../theme';

export const CizScreen: React.FC = () => {
  const theme = useTheme<AppTheme>();

  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <View style={styles.wrapper}>
        <View style={styles.content}>{/* TODO: CIZポイント機能を実装 */}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    width: '100%',
  },
  content: {
    flex: 1,
  },
});
