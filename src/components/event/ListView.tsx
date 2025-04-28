/**
 * イベントリストビューコンポーネント
 * イベントを日付順に一覧表示
 * 各イベントの詳細情報とともに表示
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

interface ListViewProps {
  events: Event[];
  onEventPress: (event: Event) => void;
}

export const ListView: React.FC<ListViewProps> = ({events, onEventPress}) => {
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
      onPress={() => onEventPress(item)}>
      <View style={styles.eventTimeContainer}>
        <MaterialIcons
          name="access-time"
          size={14}
          color="rgba(234, 234, 234, 0.6)"
        />
        <Text style={styles.eventTime}>{item.time}</Text>
      </View>

      <View style={styles.eventContent}>
        <Text style={styles.eventTitle} numberOfLines={1}>
          {item.title}
        </Text>

        <View style={styles.eventDetails}>
          <View style={styles.eventLocation}>
            <MaterialIcons
              name="place"
              size={12}
              color="rgba(234, 234, 234, 0.6)"
            />
            <Text style={styles.eventLocationText} numberOfLines={1}>
              {item.location}
            </Text>
          </View>

          <View style={styles.eventCapacity}>
            <MaterialIcons
              name="people"
              size={12}
              color="rgba(234, 234, 234, 0.6)"
            />
            <Text style={styles.eventCapacityText}>
              {item.participantsCount}/{item.capacity}
            </Text>
          </View>
        </View>

        <View style={styles.eventBottom}>
          <Text style={styles.eventPoints}>+{item.points} CIZ</Text>
          {item.isRegistered && (
            <View style={styles.eventRegisteredBadge}>
              <MaterialIcons
                name="check-circle"
                size={10}
                color="rgb(108, 186, 162)"
              />
              <Text style={styles.eventRegisteredText}>参加登録済み</Text>
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
    paddingBottom: 20,
  },
  sectionHeader: {
    backgroundColor: 'rgba(84, 98, 224, 0.15)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(84, 98, 224, 0.3)',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgb(234, 234, 234)',
  },
  eventItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
  },
  eventTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 80,
    marginRight: 12,
  },
  eventTime: {
    fontSize: 13,
    color: 'rgba(234, 234, 234, 0.8)',
    marginLeft: 4,
  },
  eventContent: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: 'rgb(234, 234, 234)',
    marginBottom: 6,
  },
  eventDetails: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  eventLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  eventLocationText: {
    fontSize: 12,
    color: 'rgba(234, 234, 234, 0.6)',
    marginLeft: 4,
  },
  eventCapacity: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventCapacityText: {
    fontSize: 12,
    color: 'rgba(234, 234, 234, 0.6)',
    marginLeft: 3,
  },
  eventBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eventPoints: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgb(108, 186, 162)',
  },
  eventRegisteredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(108, 186, 162, 0.15)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  eventRegisteredText: {
    fontSize: 10,
    color: 'rgb(108, 186, 162)',
    marginLeft: 3,
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
