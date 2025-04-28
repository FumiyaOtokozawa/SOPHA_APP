/**
 * イベント履歴項目を表示するコンポーネント
 * 日付、イベントタイトル、開催場所、獲得ポイントを表示する
 * 開催場所はアイコン付きで表示する
 * HistoryTabsコンポーネント内で使用される
 */

import React from 'react';
import {View, Text} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {EventHistory} from '../../types/home';
import {homeStyles} from '../../styles/screens/home/homeStyles';
import {useTheme} from 'react-native-paper';
import type {AppTheme} from '../../theme';

interface EventHistoryItemProps {
  item: EventHistory;
}

export const EventHistoryItem: React.FC<EventHistoryItemProps> = ({item}) => {
  const theme = useTheme<AppTheme>();

  return (
    <View style={homeStyles.history__item}>
      <View style={homeStyles.history__itemHeader}>
        <Text style={homeStyles.history__date}>{item.date}</Text>
        <Text
          style={[homeStyles.history__points, {color: theme.colors.success}]}>
          +{item.points} CIZ
        </Text>
      </View>
      <Text style={homeStyles.history__title}>{item.title}</Text>
      <View style={homeStyles.history__location}>
        <MaterialIcons
          name="place"
          size={14}
          color="rgba(234, 234, 234, 0.6)"
        />
        <Text style={homeStyles.history__locationText}>{item.location}</Text>
      </View>
    </View>
  );
};
