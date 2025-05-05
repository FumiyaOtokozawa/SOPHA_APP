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
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  // 日付ごとのイベントをインデックス化（高速アクセス用）
  const eventsByDate = useMemo(() => {
    const mapping: Record<string, Event[]> = {};
    events.forEach(event => {
      // YYY/MM/DD形式で保存
      const date = event.date;
      if (!mapping[date]) {
        mapping[date] = [];
      }
      mapping[date].push(event);
    });
    return mapping;
  }, [events]);

  // カレンダー日付形式（YYYY-MM-DD）からイベント日付形式（YYYY/MM/DD）に変換
  const convertDateFormat = useCallback((dateString: string) => {
    return dateString.replace(/-/g, '/');
  }, []);

  // イベントデータを即時読み込み（遅延を削除）
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // 実際のアプリではAPIからの取得になる想定
        setEvents(allCalendarEvents);
        setIsLoading(false);
      } catch (error) {
        console.error('イベントの取得に失敗しました', error);
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // 日付選択時の処理を最適化
  const handleDayPress = useCallback(
    (date: DateData) => {
      const dateString = date.dateString; // YYYY-MM-DD形式
      setSelectedDate(dateString);

      // YYYY-MM-DDをYYYY/MM/DDに変換してイベント検索
      const formattedDate = convertDateFormat(dateString);
      const dayEvents = eventsByDate[formattedDate] || [];

      console.log('選択日付:', dateString);
      console.log('変換後の日付:', formattedDate);
      console.log('該当イベント数:', dayEvents.length);

      setFilteredEvents(dayEvents);
    },
    [eventsByDate, convertDateFormat],
  );

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
  const handleViewModeChange = useCallback(
    (mode: 'calendar' | 'list') => {
      setViewMode(mode);
      // リストビューに切り替え時は全てのイベントを表示
      if (mode === 'list') {
        setFilteredEvents(events);
      } else if (selectedDate) {
        // カレンダービューに戻る時は選択中の日付のイベントを表示
        const formattedDate = convertDateFormat(selectedDate);
        setFilteredEvents(eventsByDate[formattedDate] || []);
      }
    },
    [events, selectedDate, eventsByDate, convertDateFormat],
  );

  // アドボタンの位置を計算
  const addButtonBottom = 16;

  // コンテナスタイルをメモ化
  const containerStyle = useMemo(
    () => [styles.container, {backgroundColor: theme.colors.background}],
    [theme.colors.background],
  );

  // コンテンツに表示するイベント
  const displayEvents = useMemo(() => {
    if (viewMode === 'list' || !selectedDate) {
      return viewMode === 'list' ? events : [];
    }
    return filteredEvents;
  }, [viewMode, events, filteredEvents, selectedDate]);

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
          <CalendarView
            events={events}
            onDayPress={handleDayPress}
            selectedDate={selectedDate}
            filteredEvents={filteredEvents}
          />
        ) : (
          <ListView events={displayEvents} onEventPress={handleEventPress} />
        )}
      </View>

      {/* 新規イベント追加ボタン */}
      <AddButton bottom={addButtonBottom} onPress={handleAddEvent} />
    </SafeAreaView>
  );
});
