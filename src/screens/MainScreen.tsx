import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import type {AppTheme} from '../theme';
import {Header} from '../components/common/Header';
import {Footer} from '../components/common/Footer';

export const MainScreen: React.FC = () => {
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
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.colors.background}]}
      edges={['top', 'bottom']}>
      <View style={styles.wrapper}>
        <Header onMenuPress={handleMenuPress} />
        <View style={styles.content}>
          {/* TODO: タブごとのコンテンツを実装 */}
        </View>
        <Footer activeTab={activeTab} onTabPress={handleTabPress} />
      </View>
    </SafeAreaView>
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
