/**
 * ポイント履歴とイベント履歴を切り替え表示するタブコンポーネント
 * タブ切り替えにより、PointHistoryItemとEventHistoryItemを切り替えて表示する
 * ホーム画面の下部に配置され、ユーザーの活動履歴を一覧表示する
 */

import React from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {homeStyles} from '../../styles/screens/home/homeStyles';
import {PointHistory, EventHistory} from '../../types/home';
import {PointHistoryItem} from './PointHistoryItem';
import {EventHistoryItem} from './EventHistoryItem';

interface HistoryTabsProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  pointsHistory: PointHistory[];
  eventsHistory: EventHistory[];
}

export const HistoryTabs: React.FC<HistoryTabsProps> = ({
  activeSection,
  onSectionChange,
  pointsHistory,
  eventsHistory,
}) => {
  // マップ関数でレンダリングするアイテムを作成
  const renderPointHistoryItems = () => {
    return pointsHistory.map(item => (
      <PointHistoryItem key={item.id} item={item} />
    ));
  };

  const renderEventHistoryItems = () => {
    return eventsHistory.map(item => (
      <EventHistoryItem key={item.id} item={item} />
    ));
  };

  return (
    <View style={homeStyles.history__container}>
      <View style={homeStyles.history__tabs}>
        <TouchableOpacity
          style={[
            homeStyles.history__tab,
            activeSection === 'points' && homeStyles.history__tabActive,
          ]}
          onPress={() => onSectionChange('points')}>
          <Text
            style={[
              homeStyles.history__tabText,
              activeSection === 'points' && homeStyles.history__tabTextActive,
            ]}>
            ポイント履歴
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            homeStyles.history__tab,
            activeSection === 'events' && homeStyles.history__tabActive,
          ]}
          onPress={() => onSectionChange('events')}>
          <Text
            style={[
              homeStyles.history__tabText,
              activeSection === 'events' && homeStyles.history__tabTextActive,
            ]}>
            イベント履歴
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={homeStyles.history__list}
        showsVerticalScrollIndicator={true}
        nestedScrollEnabled={true}>
        {activeSection === 'points'
          ? renderPointHistoryItems()
          : renderEventHistoryItems()}
      </ScrollView>
    </View>
  );
};
