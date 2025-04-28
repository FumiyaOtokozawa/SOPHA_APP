/**
 * アプリのホーム画面コンポーネント
 * ユーザーのポイント状況、本日のイベント、参加予定のイベント、履歴を表示する
 * 各セクションは個別のコンポーネントに分割され、状態管理はuseHomeScreenStateフックで行う
 * ヘッダーとフッターのタブナビゲーションを備える
 */

import React from 'react';
import {View, ScrollView} from 'react-native';
import {useTheme} from 'react-native-paper';
import type {AppTheme} from '../theme';
import {Header} from '../components/common/Header';
import {Footer} from '../components/common/Footer';
import {homeStyles} from '../styles/screens/home/homeStyles';
import {useHomeScreenState} from '../hooks/useHomeScreenState';
import {PointsCard} from '../components/home/PointsCard';
import {TodayEvents} from '../components/home/TodayEvents';
import {RegisteredEvents} from '../components/home/RegisteredEvents';
import {HistoryTabs} from '../components/home/HistoryTabs';

export const HomeScreen: React.FC = () => {
  const theme = useTheme<AppTheme>();
  const {
    activeTab,
    activeSection,
    todayEventsExpanded,
    registeredEventsExpanded,
    pointsHistory,
    eventsHistory,
    todayEvents,
    registeredEvents,
    totalPoints,
    lastMonthChange,
    handleTabPress,
    handleSectionChange,
    toggleTodayEvents,
    toggleRegisteredEvents,
  } = useHomeScreenState();

  return (
    <View
      style={[
        homeStyles.container,
        {backgroundColor: theme.colors.background},
      ]}>
      <View style={homeStyles.wrapper}>
        <Header />
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
        <Footer activeTab={activeTab} onTabPress={handleTabPress} />
      </View>
    </View>
  );
};
