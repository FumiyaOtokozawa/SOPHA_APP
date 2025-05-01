/**
 * カスタムヘッダーコンポーネント
 * タイトルとバックボタンを持つシンプルなヘッダー
 * 画面タイトルの表示やナビゲーションに使用
 */
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface CustomHeaderProps {
  title: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
}

export const CustomHeader: React.FC<CustomHeaderProps> = ({
  title,
  showBackButton = false,
  onBackPress,
}) => {
  return (
    <View
      style={[
        styles.header,
        {
          paddingTop: 12,
        },
      ]}>
      <View style={styles.headerContent}>
        {showBackButton && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={onBackPress}
            hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}>
            <MaterialIcons
              name="arrow-back"
              size={24}
              color="rgb(234, 234, 234)"
            />
          </TouchableOpacity>
        )}
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'rgba(28, 29, 33, 0.95)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    paddingBottom: 12,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    position: 'relative',
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: 'rgb(234, 234, 234)',
  },
});
