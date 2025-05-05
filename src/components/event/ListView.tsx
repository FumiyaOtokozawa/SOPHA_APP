/**
 * イベントリストビューコンポーネント
 * イベントを日付順に一覧表示
 * 各イベントの詳細情報とともにコンパクトに表示
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SectionList,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Event} from '../../types/home';
import {useNavigation} from '@react-navigation/native';

interface ListViewProps {
  events: Event[];
  onEventPress: (event: Event) => void;
}

export const ListView: React.FC<ListViewProps> = ({events, onEventPress}) => {
  const navigation = useNavigation();

  // イベント選択時の処理
  const handleEventSelect = (event: Event) => {
    // まずpropsで渡されたonEventPressコールバックを呼び出し
    onEventPress(event);

    // 次にイベント詳細画面へ遷移
    // @ts-ignore - 型エラーを無視
    navigation.navigate('EventDetail', {eventId: event.id});
  };

  // 日付ごとにイベントをグループ化
  const groupEventsByDate = () => {
    const grouped: {[key: string]: Event[]} = {};

    // 日付ごとにイベントを分類
    events.forEach(event => {
      if (!grouped[event.date]) {
        grouped[event.date] = [];
      }
      grouped[event.date].push(event);
    });

    // SectionListに適した形式に変換
    return Object.keys(grouped)
      .sort() // 日付順にソート
      .map(date => ({
        title: date,
        data: grouped[date].sort((a, b) => {
          // 時間順にソート（HH:MM-HH:MM形式を想定）
          const timeA = a.time.split('-')[0];
          const timeB = b.time.split('-')[0];
          return timeA.localeCompare(timeB);
        }),
      }));
  };

  const sections = groupEventsByDate();

  // 日付をフォーマット（2023/10/20 → 10月20日（金））
  const formatDate = (dateString: string) => {
    const date = new Date(dateString.replace(/\//g, '-'));
    const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekday = weekdays[date.getDay()];
    return `${month}月${day}日（${weekday}）`;
  };

  // セクションヘッダーをレンダリング
  const renderSectionHeader = ({section}: {section: {title: string}}) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{formatDate(section.title)}</Text>
    </View>
  );

  // イベントアイテムをレンダリング
  const renderEventItem = ({item}: {item: Event}) => (
    <TouchableOpacity
      style={styles.eventItem}
      onPress={() => handleEventSelect(item)}>
      <View style={styles.eventContent}>
        <View style={styles.eventTitleRow}>
          <Text style={styles.eventTitle} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.eventPoints}>+{item.points} CIZ</Text>
        </View>

        <View style={styles.eventTimeContainer}>
          <MaterialIcons
            name="access-time"
            size={12}
            color="rgba(234, 234, 234, 0.6)"
          />
          <Text style={styles.eventTime}>{item.time}</Text>
        </View>

        <View style={styles.eventDetailsRow}>
          <View style={styles.eventLocation}>
            <MaterialIcons
              name="place"
              size={10}
              color="rgba(234, 234, 234, 0.6)"
            />
            <Text style={styles.eventLocationText} numberOfLines={1}>
              {item.location}
            </Text>
          </View>

          <View style={styles.eventCapacity}>
            <MaterialIcons
              name="people"
              size={10}
              color="rgba(234, 234, 234, 0.6)"
            />
            <Text style={styles.eventCapacityText}>
              {item.participantsCount}/{item.capacity}
            </Text>
          </View>

          {item.isRegistered && (
            <View style={styles.eventRegisteredBadge}>
              <MaterialIcons
                name="check-circle"
                size={9}
                color="rgb(108, 186, 162)"
              />
              <Text style={styles.eventRegisteredText}>参加登録済</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SectionList
      sections={sections}
      keyExtractor={item => item.id}
      renderItem={renderEventItem}
      renderSectionHeader={renderSectionHeader}
      stickySectionHeadersEnabled={true}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <MaterialIcons
            name="event-busy"
            size={48}
            color="rgba(234, 234, 234, 0.3)"
          />
          <Text style={styles.emptyText}>イベントはありません</Text>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 16,
  },
  sectionHeader: {
    backgroundColor: 'rgba(84, 98, 224, 0.15)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(84, 98, 224, 0.3)',
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgb(234, 234, 234)',
  },
  eventItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
  },
  eventContent: {
    flex: 1,
  },
  eventTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 3,
  },
  eventTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgb(234, 234, 234)',
    flex: 1,
    marginRight: 8,
  },
  eventTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
  },
  eventTime: {
    fontSize: 12,
    color: 'rgba(234, 234, 234, 0.8)',
    marginLeft: 3,
  },
  eventDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 6,
  },
  eventLocationText: {
    fontSize: 11,
    color: 'rgba(234, 234, 234, 0.6)',
    marginLeft: 2,
  },
  eventCapacity: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 6,
  },
  eventCapacityText: {
    fontSize: 11,
    color: 'rgba(234, 234, 234, 0.6)',
    marginLeft: 2,
  },
  eventPoints: {
    fontSize: 11,
    fontWeight: '600',
    color: 'rgb(108, 186, 162)',
  },
  eventRegisteredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(108, 186, 162, 0.15)',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 3,
  },
  eventRegisteredText: {
    fontSize: 9,
    color: 'rgb(108, 186, 162)',
    marginLeft: 2,
    fontWeight: '500',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    marginTop: 12,
    fontSize: 14,
    color: 'rgba(234, 234, 234, 0.5)',
  },
});
