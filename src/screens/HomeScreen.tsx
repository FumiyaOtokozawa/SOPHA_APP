/**
 * アプリのホーム画面コンポーネント
 * ユーザーのポイント状況、本日のイベント、参加予定のイベント、履歴を表示する
 * 各セクションは個別のコンポーネントに分割され、状態管理はuseHomeScreenStateフックで行う
 * 共通ヘッダーとフッターはAppNavigatorで提供される
 */

import React, {useMemo, Suspense} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';
import type {AppTheme} from '../theme';
import {homeStyles} from '../styles/screens/home/homeStyles';
import {useHomeScreenState} from '../hooks/useHomeScreenState';
import {PointsCard} from '../components/home/PointsCard';
import {TodayEvents} from '../components/home/TodayEvents';
import {RegisteredEvents} from '../components/home/RegisteredEvents';
import {HistoryTabs} from '../components/home/HistoryTabs';
import {AnimatedLoader} from '../components/common/AnimatedLoader';

// ローディングコンポーネント
const LoadingIndicator = () => {
  const theme = useTheme<AppTheme>();
  return (
    <View style={styles.loadingContainer}>
      <AnimatedLoader
        color={theme.colors.primary}
        message="ポイントデータを取得中..."
        iconName="token"
      />
    </View>
  );
};

// HomeContentのProps型定義
type HomeContentProps = {
  totalPoints: number;
  lastMonthChange: number;
  todayEvents: any[]; // 適切な型に変更してください
  todayEventsExpanded: boolean;
  toggleTodayEvents: () => void;
  registeredEvents: any[]; // 適切な型に変更してください
  registeredEventsExpanded: boolean;
  toggleRegisteredEvents: () => void;
  activeSection: string;
  pointsHistory: any[]; // 適切な型に変更してください
  eventsHistory: any[]; // 適切な型に変更してください
  handleSectionChange: (section: string) => void;
};

// メイン表示部分をメモ化
const HomeContent = React.memo<HomeContentProps>(
  ({
    totalPoints,
    lastMonthChange,
    todayEvents,
    todayEventsExpanded,
    toggleTodayEvents,
    registeredEvents,
    registeredEventsExpanded,
    toggleRegisteredEvents,
    activeSection,
    pointsHistory,
    eventsHistory,
    handleSectionChange,
  }) => {
    return (
      <ScrollView
        style={homeStyles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <View style={homeStyles.content}>
          <PointsCard
            totalPoints={totalPoints}
            lastMonthChange={lastMonthChange}
          />

          <TodayEvents
            todayEvents={todayEvents}
            expanded={todayEventsExpanded}
            onToggle={toggleTodayEvents}
          />

          <RegisteredEvents
            registeredEvents={registeredEvents}
            expanded={registeredEventsExpanded}
            onToggle={toggleRegisteredEvents}
          />

          <HistoryTabs
            activeSection={activeSection}
            onSectionChange={handleSectionChange}
            pointsHistory={pointsHistory}
            eventsHistory={eventsHistory}
          />
        </View>
      </ScrollView>
    );
  },
);

export const HomeScreen = React.memo(() => {
  const theme = useTheme<AppTheme>();
  const {
    activeSection,
    todayEventsExpanded,
    registeredEventsExpanded,
    pointsHistory,
    eventsHistory,
    todayEvents,
    registeredEvents,
    totalPoints,
    lastMonthChange,
    handleSectionChange,
    toggleTodayEvents,
    toggleRegisteredEvents,
  } = useHomeScreenState();

  // スタイルをメモ化
  const containerStyle = useMemo(
    () => [homeStyles.container, {backgroundColor: theme.colors.background}],
    [theme.colors.background],
  );

  return (
    <View style={containerStyle}>
      <Suspense fallback={<LoadingIndicator />}>
        <HomeContent
          totalPoints={totalPoints}
          lastMonthChange={lastMonthChange}
          todayEvents={todayEvents}
          todayEventsExpanded={todayEventsExpanded}
          toggleTodayEvents={toggleTodayEvents}
          registeredEvents={registeredEvents}
          registeredEventsExpanded={registeredEventsExpanded}
          toggleRegisteredEvents={toggleRegisteredEvents}
          activeSection={activeSection}
          pointsHistory={pointsHistory}
          eventsHistory={eventsHistory}
          handleSectionChange={handleSectionChange}
        />
      </Suspense>
    </View>
  );
});

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
