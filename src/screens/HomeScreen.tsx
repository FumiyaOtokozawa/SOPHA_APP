import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';
import type {AppTheme} from '../theme';
import {Header} from '../components/common/Header';
import {Footer} from '../components/common/Footer';

export const HomeScreen: React.FC = () => {
  const theme = useTheme<AppTheme>();
  const [activeTab, setActiveTab] = useState('home');

  const handleMenuPress = () => {
    // TODO: ハンバーガーメニューの処理を実装
    console.log('Menu pressed');
  };

  const handleTabPress = (tabKey: string) => {
    setActiveTab(tabKey);
  };

  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <View style={styles.wrapper}>
        <Header onMenuPress={handleMenuPress} />
        <View style={styles.content}>
          {/* TODO: タブごとのコンテンツを実装 */}
        </View>
        <Footer activeTab={activeTab} onTabPress={handleTabPress} />
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
