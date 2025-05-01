/**
 * イベント一覧画面コンポーネント
 * イベントをカレンダー形式または一覧形式で表示する
 * 表示形式の切り替えと新規イベント追加機能を提供
 * 共通ヘッダーとフッターはAppNavigatorで提供される
 */

import React, {useState, useCallback, useMemo, useEffect} from 'react';
import {View, TouchableOpacity, SafeAreaView, Text} from 'react-native';
import {useTheme} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {DateData} from 'react-native-calendars';
// import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import type {AppTheme} from '../theme';
import {CalendarView} from '../components/event/CalendarView';
import {ListView} from '../components/event/ListView';
import {Event} from '../types/home';
import {allCalendarEvents} from '../constants/mockData';
import {AnimatedLoader} from '../components/common/AnimatedLoader';
import {styles} from '../styles/screens/event/EventScreenStyle';

// メモ化したViewModeToggleコンポーネント
const ViewModeToggle = React.memo(
  ({
    viewMode,
    onViewModeChange,
  }: {
    viewMode: 'calendar' | 'list';
    onViewModeChange: (mode: 'calendar' | 'list') => void;
  }) => {
    return (
      <View style={styles.viewModeToggle}>
        <TouchableOpacity
          style={[
            styles.viewModeTab,
            viewMode === 'calendar' && styles.viewModeTabActive,
          ]}
          onPress={() => onViewModeChange('calendar')}>
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
          onPress={() => onViewModeChange('list')}>
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
    );
  },
);

// メモ化したAddButtonコンポーネント
const AddButton = React.memo(
  ({bottom, onPress}: {bottom: number; onPress: () => void}) => {
    return (
      <TouchableOpacity
        style={[styles.addButton, {bottom: bottom}]}
        onPress={onPress}>
        <MaterialIcons name="library-add" size={24} color="#FFF" />
      </TouchableOpacity>
    );
  },
);

// カスタムローディングコンポーネント
const EventLoader = React.memo(() => {
  const theme = useTheme<AppTheme>();
  return (
    <View style={styles.loaderContainer}>
      <AnimatedLoader
        color={theme.colors.primary}
        message="イベントデータを読み込み中..."
        iconName="event"
      />
    </View>
  );
});

export const EventScreen: React.FC = React.memo(() => {
  const theme = useTheme<AppTheme>();
  // const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // イベントデータを遅延読み込み
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // 実際のアプリではAPIからの取得になる想定で、setTimeout でデータロードを遅延
        // これにより画面遷移後に徐々にデータを表示できる
        setTimeout(() => {
          setEvents(allCalendarEvents);
          setIsLoading(false);
        }, 1000); // ローダーをより見せるために少し遅延を長くする
      } catch (error) {
        console.error('イベントの取得に失敗しました', error);
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

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
    // イベント作成画面に遷移
    // @ts-ignore - 型エラーを無視
    navigation.navigate('CreateEvent');
  }, [navigation]);

  // ビューモード変更ハンドラ
  const handleViewModeChange = useCallback((mode: 'calendar' | 'list') => {
    setViewMode(mode);
  }, []);

  // アドボタンの位置を計算
  const addButtonBottom = 16;

  // コンテナスタイルをメモ化
  const containerStyle = useMemo(
    () => [styles.container, {backgroundColor: theme.colors.background}],
    [theme.colors.background],
  );

  return (
    <SafeAreaView style={containerStyle}>
      {/* 表示切り替えタブ */}
      <ViewModeToggle
        viewMode={viewMode}
        onViewModeChange={handleViewModeChange}
      />

      <View style={styles.content}>
        {isLoading ? (
          <EventLoader />
        ) : viewMode === 'calendar' ? (
          <CalendarView events={events} onDayPress={handleDayPress} />
        ) : (
          <ListView events={events} onEventPress={handleEventPress} />
        )}
      </View>

      {/* 新規イベント追加ボタン */}
      <AddButton bottom={addButtonBottom} onPress={handleAddEvent} />
    </SafeAreaView>
  );
});
