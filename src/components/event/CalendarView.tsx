/* eslint-disable react-native/no-inline-styles */
/**
 * イベントカレンダービューコンポーネント
 * 月間カレンダー形式でイベントを表示
 * Googleカレンダー風のセル形式でイベントを視覚的に表示
 */

import React, {useState, useCallback, useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Calendar, DateData} from 'react-native-calendars';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Event} from '../../types/home';
import {useNavigation} from '@react-navigation/native';

interface CalendarViewProps {
  events: Event[];
  onDayPress: (date: DateData) => void;
  selectedDate?: string;
  filteredEvents?: Event[];
}

// 拡張したイベントタイプの定義
interface ColoredEvent extends Event {
  color: string;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  events,
  onDayPress,
  selectedDate: propSelectedDate,
  filteredEvents,
}) => {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD形式
  const [internalSelectedDate, setInternalSelectedDate] = useState(today);
  const navigation = useNavigation();

  // 親コンポーネントから渡されたselectedDateか内部のselectedDateを使用
  const selectedDate = propSelectedDate || internalSelectedDate;

  // カレンダー日付形式（YYYY-MM-DD）からイベント日付形式（YYYY/MM/DD）に変換
  const convertDateFormat = useCallback((dateString: string) => {
    return dateString.replace(/-/g, '/');
  }, []);

  // イベント日付形式（YYYY/MM/DD）からカレンダー日付形式（YYYY-MM-DD）に変換
  const convertToCalendarFormat = useCallback((dateString: string) => {
    return dateString.replace(/\//g, '-');
  }, []);

  // 日付が選択されたときの処理
  const handleDayPress = useCallback(
    (day: DateData) => {
      setInternalSelectedDate(day.dateString);
      onDayPress(day);
    },
    [onDayPress],
  );

  // イベントが選択されたときの処理
  const handleEventPress = useCallback(
    (event: Event) => {
      // @ts-ignore - 型エラーを無視
      navigation.navigate('EventDetail', {eventId: event.id});
    },
    [navigation],
  );

  // イベントに色を割り当てる関数
  const colorizeEvents = useCallback((eventList: Event[]): ColoredEvent[] => {
    const colors = [
      '#5462E0', // メインカラー
      '#E16670', // エラーカラー
      '#6CBA90', // 成功カラー
      '#FF6600', // オレンジ
      '#9370DB', // パープル
    ];

    return eventList.map(event => {
      const colorIndex = Math.abs(event.id.charCodeAt(0)) % colors.length;
      return {
        ...event,
        color: colors[colorIndex],
      };
    });
  }, []);

  // イベントの日付をカレンダーのマーカー用に整形
  const markedDates = useMemo(() => {
    const markers: {[key: string]: any} = {};

    // 選択中の日付
    markers[selectedDate] = {
      selected: true,
      selectedColor: 'rgb(84, 98, 224)',
    };

    // イベントがある日付
    events.forEach(event => {
      // YYYY/MM/DD形式をYYYY-MM-DD形式に変換
      const formattedDate = convertToCalendarFormat(event.date);
      if (markers[formattedDate]) {
        // すでにマークがある場合は、ドットを追加
        markers[formattedDate] = {
          ...markers[formattedDate],
          marked: true,
          dots: markers[formattedDate].dots
            ? [...markers[formattedDate].dots, {color: 'rgb(108, 186, 162)'}]
            : [{color: 'rgb(108, 186, 162)'}],
        };
      } else {
        // 新しくマークを追加
        markers[formattedDate] = {
          marked: true,
          dots: [{color: 'rgb(108, 186, 162)'}],
          ...(formattedDate === selectedDate
            ? {selected: true, selectedColor: 'rgb(84, 98, 224)'}
            : {}),
        };
      }
    });

    return markers;
  }, [events, selectedDate, convertToCalendarFormat]);

  // 選択した日付のイベントを色付きで取得（親から渡されたfilteredEventsを利用）
  const selectedDateEvents = useMemo(() => {
    // 親コンポーネントからフィルタリング済みイベントが渡された場合はそれを使用
    if (filteredEvents && filteredEvents.length > 0) {
      return colorizeEvents(filteredEvents);
    }

    // 親からのフィルタリングがない場合は、ここで自前でフィルタリング
    const formattedDate = convertDateFormat(selectedDate);
    const dayEvents = events.filter(event => event.date === formattedDate);

    console.log('選択中日付:', selectedDate);
    console.log('変換後日付:', formattedDate);
    console.log('イベント数:', dayEvents.length);

    return colorizeEvents(dayEvents);
  }, [events, selectedDate, filteredEvents, colorizeEvents, convertDateFormat]);

  // 選択日の曜日を取得
  const selectedDayOfWeek = useMemo(() => {
    const date = new Date(selectedDate);
    const dayNames = ['日', '月', '火', '水', '木', '金', '土'];
    return dayNames[date.getDay()];
  }, [selectedDate]);

  // 選択日が週末かどうか
  const isWeekend = useMemo(() => {
    const date = new Date(selectedDate);
    const dayOfWeek = date.getDay();
    return dayOfWeek === 0 || dayOfWeek === 6;
  }, [selectedDate]);

  // イベント項目をレンダリング
  const renderEventItem = (event: ColoredEvent) => {
    return (
      <TouchableOpacity
        key={event.id}
        style={[styles.eventItem, {backgroundColor: `${event.color}40`}]} // 40は透明度を表す16進数
        activeOpacity={0.7}
        onPress={() => handleEventPress(event)}>
        <View style={[styles.eventColorBar, {backgroundColor: event.color}]} />
        <View style={styles.eventContent}>
          <Text style={styles.eventTitle} numberOfLines={1}>
            {event.title}
          </Text>
          <View style={styles.eventDetails}>
            <View style={styles.eventTimeLocation}>
              <MaterialIcons
                name="access-time"
                size={12}
                color="rgba(234, 234, 234, 0.7)"
              />
              <Text style={styles.eventDetailText}>{event.time}</Text>
              <MaterialIcons
                name="place"
                size={12}
                color="rgba(234, 234, 234, 0.7)"
                style={{marginLeft: 8}}
              />
              <Text style={styles.eventDetailText} numberOfLines={1}>
                {event.location}
              </Text>
            </View>
            <Text style={styles.eventPoints}>+{event.points} CIZ</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Calendar
        current={selectedDate}
        onDayPress={handleDayPress}
        markedDates={markedDates}
        markingType={'multi-dot'}
        firstDay={0}
        enableSwipeMonths={true}
        theme={{
          calendarBackground: 'rgba(36, 37, 41, 0.8)',
          textSectionTitleColor: 'rgb(234, 234, 234)',
          selectedDayBackgroundColor: 'rgb(84, 98, 224)',
          selectedDayTextColor: '#ffffff',
          todayTextColor: 'rgb(84, 98, 224)',
          dayTextColor: 'rgb(234, 234, 234)',
          textDisabledColor: 'rgba(234, 234, 234, 0.3)',
          dotColor: 'rgb(108, 186, 162)',
          selectedDotColor: '#ffffff',
          arrowColor: 'rgb(84, 98, 224)',
          monthTextColor: 'rgb(234, 234, 234)',
          indicatorColor: 'rgb(84, 98, 224)',
          textDayFontWeight: '300',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: '500',
          textDayFontSize: 14,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 12,
        }}
      />

      {/* 選択日のイベント一覧 */}
      <View style={styles.eventsContainer}>
        <View style={styles.dateHeader}>
          <Text style={styles.dateHeaderTitle}>
            {new Date(selectedDate).toLocaleDateString('ja-JP', {
              month: 'long',
              day: 'numeric',
            })}
          </Text>
          <Text
            style={[
              styles.dateHeaderDay,
              isWeekend &&
                (new Date(selectedDate).getDay() === 0
                  ? styles.sundayText
                  : styles.saturdayText),
            ]}>
            ({selectedDayOfWeek})
          </Text>
        </View>

        <ScrollView style={styles.eventsList}>
          <View style={styles.eventsListContent}>
            {selectedDateEvents.length > 0 ? (
              selectedDateEvents.map(event => renderEventItem(event))
            ) : (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                  この日にイベントはありません
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  eventsContainer: {
    flex: 1,
    backgroundColor: 'rgba(36, 37, 41, 0.9)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  dateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'rgba(36, 37, 41, 0.95)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  dateHeaderTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'rgb(234, 234, 234)',
  },
  dateHeaderDay: {
    fontSize: 14,
    marginLeft: 8,
    color: 'rgb(234, 234, 234)',
  },
  eventsList: {
    flex: 1,
    padding: 8,
  },
  eventsListContent: {
    marginBottom: 64,
  },
  sundayText: {
    color: 'rgb(225, 102, 108)',
  },
  saturdayText: {
    color: 'rgb(84, 98, 224)',
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: 'rgba(234, 234, 234, 0.5)',
    fontSize: 14,
  },
  eventItem: {
    flexDirection: 'row',
    marginVertical: 4,
    borderRadius: 4,
    overflow: 'hidden',
    minHeight: 60,
  },
  eventColorBar: {
    width: 5,
  },
  eventContent: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: 'center',
  },
  eventTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: 'rgb(234, 234, 234)',
    marginBottom: 4,
  },
  eventDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eventTimeLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  eventDetailText: {
    fontSize: 12,
    color: 'rgba(234, 234, 234, 0.7)',
    marginLeft: 4,
  },
  eventPoints: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgb(108, 186, 162)',
  },
});
