/**
 * ポイント履歴項目を表示するコンポーネント
 * 日付、タイトル、獲得または使用したポイントを表示する
 * ポイント獲得時は緑色、使用時は赤色で表示する
 * HistoryTabsコンポーネント内で使用される
 */

import React from 'react';
import {View, Text} from 'react-native';
import {PointHistory} from '../../types/home';
import {homeStyles} from '../../styles/screens/home/homeStyles';
import {useTheme} from 'react-native-paper';
import type {AppTheme} from '../../theme';

interface PointHistoryItemProps {
  item: PointHistory;
}

export const PointHistoryItem: React.FC<PointHistoryItemProps> = ({item}) => {
  const theme = useTheme<AppTheme>();

  return (
    <View style={homeStyles.history__item}>
      <View style={homeStyles.history__itemHeader}>
        <Text style={homeStyles.history__date}>{item.date}</Text>
        <Text
          style={[
            homeStyles.history__points,
            {
              color:
                item.type === 'earn'
                  ? theme.colors.success
                  : theme.colors.error,
            },
          ]}>
          {item.type === 'earn' ? '+' : '-'}
          {item.points} CIZ
        </Text>
      </View>
      <Text style={homeStyles.history__title}>{item.title}</Text>
    </View>
  );
};
