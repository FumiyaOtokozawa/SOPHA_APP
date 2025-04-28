/**
 * ホーム画面の状態管理を行うカスタムフック
 * ホーム画面で使用するタブ状態、セクション表示状態、データの提供を一元管理する
 * 状態変更ハンドラーやデータ取得ロジックのカプセル化により、HomeScreenコンポーネントの可読性を向上
 */

import {useState} from 'react';
import {
  pointsHistory,
  eventsHistory,
  todayEvents,
  registeredEvents,
  totalPoints,
  lastMonthChange,
} from '../constants/mockData';

export const useHomeScreenState = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [activeSection, setActiveSection] = useState('points');
  const [todayEventsExpanded, setTodayEventsExpanded] = useState(false);
  const [registeredEventsExpanded, setRegisteredEventsExpanded] =
    useState(false);

  const handleTabPress = (tabKey: string) => {
    setActiveTab(tabKey);
  };

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  const toggleTodayEvents = () => {
    setTodayEventsExpanded(!todayEventsExpanded);
  };

  const toggleRegisteredEvents = () => {
    setRegisteredEventsExpanded(!registeredEventsExpanded);
  };

  return {
    // 状態
    activeTab,
    activeSection,
    todayEventsExpanded,
    registeredEventsExpanded,
    // データ
    pointsHistory,
    eventsHistory,
    todayEvents,
    registeredEvents,
    totalPoints,
    lastMonthChange,
    // ハンドラー
    handleTabPress,
    handleSectionChange,
    toggleTodayEvents,
    toggleRegisteredEvents,
  };
};
