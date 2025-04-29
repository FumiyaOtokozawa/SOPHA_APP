/**
 * イベント一覧画面コンポーネント
 * イベントをカレンダー形式または一覧形式で表示する
 * 表示形式の切り替えと新規イベント追加機能を提供
 */

import React, {useState, useCallback} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Text,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {DateData} from 'react-native-calendars';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import type {AppTheme} from '../theme';
import {Header} from '../components/common/Header';
import {Footer} from '../components/common/Footer';
import {CalendarView} from '../components/event/CalendarView';
import {ListView} from '../components/event/ListView';
import {Event} from '../types/home';
import {allCalendarEvents} from '../constants/mockData';

export const EventScreen: React.FC = () => {
  const theme = useTheme<AppTheme>();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('event');
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');

  // すべてのイベントを取得（実際のアプリではAPIで取得）
  const allEvents: Event[] = allCalendarEvents;

  const handleTabPress = (tabKey: string) => {
    setActiveTab(tabKey);
  };

  // 日付選択時の処理
  const handleDayPress = useCallback((date: DateData) => {
    console.log('選択された日付:', date.dateString);
    // ここで選択された日付に対する処理を行う
  }, []);

  // イベント選択時の処理
  const handleEventPress = useCallback((event: Event) => {
    console.log('選択されたイベント:', event.title);
    // ここで選択されたイベントに対する処理を行う
  }, []);

  // 新規イベント追加ボタン押下時の処理
  const handleAddEvent = useCallback(() => {
    console.log('新規イベント追加');
    // ここで新規イベント追加画面への遷移などを行う
  }, []);

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <View style={styles.wrapper}>
        <Header />

        {/* 表示切り替えタブ */}
        <View style={styles.viewModeToggle}>
          <TouchableOpacity
            style={[
              styles.viewModeTab,
              viewMode === 'calendar' && styles.viewModeTabActive,
            ]}
            onPress={() => setViewMode('calendar')}>
            <MaterialIcons
              name="calendar-today"
              size={20}
              color={
                viewMode === 'calendar'
                  ? 'rgb(234, 234, 234)'
                  : 'rgba(234, 234, 234, 0.5)'
              }
            />
            <Text
              style={[
                styles.viewModeText,
                viewMode === 'calendar' && styles.viewModeTextActive,
              ]}>
              カレンダー
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.viewModeTab,
              viewMode === 'list' && styles.viewModeTabActive,
            ]}
            onPress={() => setViewMode('list')}>
            <MaterialIcons
              name="list"
              size={20}
              color={
                viewMode === 'list'
                  ? 'rgb(234, 234, 234)'
                  : 'rgba(234, 234, 234, 0.5)'
              }
            />
            <Text
              style={[
                styles.viewModeText,
                viewMode === 'list' && styles.viewModeTextActive,
              ]}>
              リスト
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {viewMode === 'calendar' ? (
            <CalendarView events={allEvents} onDayPress={handleDayPress} />
          ) : (
            <ListView events={allEvents} onEventPress={handleEventPress} />
          )}
        </View>

        {/* 新規イベント追加ボタン */}
        <TouchableOpacity
          style={[styles.addButton, {bottom: 96 + insets.bottom}]}
          onPress={handleAddEvent}>
          <MaterialIcons name="library-add" size={24} color="#FFF" />
        </TouchableOpacity>

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
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  viewModeToggle: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    overflow: 'hidden',
  },
  viewModeTab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    flex: 1,
  },
  viewModeTabActive: {
    backgroundColor: 'rgba(84, 98, 224, 0.3)',
  },
  viewModeText: {
    marginLeft: 6,
    fontSize: 14,
    color: 'rgba(234, 234, 234, 0.5)',
  },
  viewModeTextActive: {
    color: 'rgb(234, 234, 234)',
    fontWeight: '500',
  },
  addButton: {
    position: 'absolute',
    right: 16,
    bottom: 80,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgb(84, 98, 224)',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
});
