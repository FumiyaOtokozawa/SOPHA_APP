/**
 * ユーザーが参加登録済みのイベント一覧を表示するセクションコンポーネント
 * 折りたたみ可能なヘッダーと、横スクロール可能なイベントリストで構成される
 * イベント一覧はEventItemコンポーネントを使用して表示
 * 各イベントアイテムには参加登録済みのバッジが表示される
 */

import React from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Event} from '../../types/home';
import {homeStyles} from '../../styles/screens/home/homeStyles';
import {EventItem} from './EventItem';
import {useTheme} from 'react-native-paper';
import type {AppTheme} from '../../theme';

interface RegisteredEventsProps {
  registeredEvents: Event[];
  expanded: boolean;
  onToggle: () => void;
}

export const RegisteredEvents: React.FC<RegisteredEventsProps> = ({
  registeredEvents,
  expanded,
  onToggle,
}) => {
  const theme = useTheme<AppTheme>();

  // 折りたたみ状態に応じてヘッダーの角丸スタイルを変更
  const headerStyle = {
    ...homeStyles.collapsible__header,
    ...(expanded
      ? {
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        }
      : {
          borderRadius: 16,
        }),
  };

  return (
    <>
      <TouchableOpacity
        style={headerStyle}
        onPress={onToggle}
        activeOpacity={0.7}>
        <View style={homeStyles.section__header}>
          <MaterialIcons
            name="bookmark"
            size={20}
            color={theme.colors.primary}
          />
          <Text style={homeStyles.section__title}>参加予定のイベント</Text>
        </View>
        <MaterialIcons
          name={expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
          size={24}
          color="rgba(234, 234, 234, 0.7)"
        />
      </TouchableOpacity>

      {expanded && (
        <FlatList
          data={registeredEvents}
          renderItem={({item}) => <EventItem item={item} />}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={homeStyles.registeredEvents__list}
        />
      )}
    </>
  );
};
