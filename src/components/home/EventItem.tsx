/**
 * イベント項目を表示するコンポーネント
 * イベントのタイトル、獲得ポイント、開催時間、定員状況、開催場所、参加登録状態を表示する
 * TodayEvents、RegisteredEventsで利用される共通コンポーネント
 */

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Event} from '../../types/home';
import {homeStyles} from '../../styles/screens/home/homeStyles';

interface EventItemProps {
  item: Event;
}

export const EventItem: React.FC<EventItemProps> = ({item}) => {
  return (
    <View style={homeStyles.event__item}>
      <Text
        style={[homeStyles.event__title, styles.singleLine]}
        numberOfLines={1}
        ellipsizeMode="tail">
        {item.title}
      </Text>

      <View style={styles.rowContainer}>
        <View style={styles.timeContainer}>
          <MaterialIcons
            name="access-time"
            size={12}
            color="rgba(234, 234, 234, 0.6)"
          />
          <Text style={homeStyles.event__time}>{item.time}</Text>
        </View>
        <Text style={homeStyles.event__points}>+{item.points} CIZ</Text>
      </View>

      <View style={styles.rowContainer}>
        <View style={homeStyles.event__location}>
          <MaterialIcons
            name="place"
            size={12}
            color="rgba(234, 234, 234, 0.6)"
          />
          <Text style={homeStyles.event__locationText}>{item.location}</Text>
        </View>
        <View style={homeStyles.event__capacity}>
          <MaterialIcons
            name="people"
            size={12}
            color="rgba(234, 234, 234, 0.6)"
          />
          <Text style={homeStyles.event__capacityText}>
            {item.participantsCount}/{item.capacity}
          </Text>
        </View>
      </View>

      {item.isRegistered && (
        <View style={homeStyles.event__registeredBadge}>
          <MaterialIcons
            name="check-circle"
            size={10}
            color="rgb(108, 186, 162)"
          />
          <Text style={homeStyles.event__registeredText}>参加登録済み</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  singleLine: {
    overflow: 'hidden',
    marginBottom: 8,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
