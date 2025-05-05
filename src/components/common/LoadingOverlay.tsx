/**
 * ローディングオーバーレイコンポーネント
 * 処理中の表示に使用する半透明のオーバーレイ
 * アニメーションアイコンとカスタムメッセージを表示可能
 */

import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator, Modal} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface LoadingOverlayProps {
  message?: string;
  iconName?: string;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  message = '読み込み中...',
  iconName,
}) => {
  return (
    <Modal transparent={true} animationType="fade">
      <View style={styles.container}>
        <View style={styles.loadingBox}>
          {iconName ? (
            <MaterialIcons
              name={iconName}
              size={36}
              color="rgb(84, 98, 224)"
              style={styles.icon}
            />
          ) : (
            <ActivityIndicator
              size="large"
              color="rgb(84, 98, 224)"
              style={styles.spinner}
            />
          )}
          <Text style={styles.message}>{message}</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  loadingBox: {
    backgroundColor: 'rgba(36, 37, 41, 0.95)',
    borderRadius: 12,
    padding: 24,
    minWidth: 180,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1,
    borderColor: 'rgba(84, 98, 224, 0.2)',
  },
  icon: {
    marginBottom: 12,
  },
  spinner: {
    marginBottom: 12,
  },
  message: {
    fontSize: 16,
    color: 'rgb(234, 234, 234)',
    textAlign: 'center',
  },
});
