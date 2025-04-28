/**
 * イベントカレンダービューコンポーネント
 * 月間カレンダー形式でイベントを表示
 * 日付にマークを付けてイベントの有無を視覚的に表示
 */

import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Calendar, DateData} from 'react-native-calendars';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Event} from '../../types/home';

interface CalendarViewProps {
  events: Event[];
  onDayPress: (date: DateData) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  events,
  onDayPress,
}) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [_currentMonth, setCurrentMonth] = useState('');

  // イベントの日付をカレンダーのマーカー用に整形
  const getMarkedDates = () => {
    const markedDates: any = {};

    // 選択中の日付
    if (selectedDate) {
      markedDates[selectedDate] = {
        selected: true,
        selectedColor: 'rgb(84, 98, 224)',
      };
    }

    // イベントがある日付
    events.forEach(event => {
      const formattedDate = event.date.replace(/\//g, '-');
      if (markedDates[formattedDate]) {
        // すでにマークがある場合は、ドットを追加
        markedDates[formattedDate] = {
          ...markedDates[formattedDate],
          dots: markedDates[formattedDate].dots
            ? [
                ...markedDates[formattedDate].dots,
                {color: 'rgb(108, 186, 162)'},
              ]
            : [{color: 'rgb(108, 186, 162)'}],
          marked: true,
        };
      } else {
        // 新しくマークを追加
        markedDates[formattedDate] = {
          marked: true,
          dots: [{color: 'rgb(108, 186, 162)'}],
          ...(formattedDate === selectedDate
            ? {selected: true, selectedColor: 'rgb(84, 98, 224)'}
            : {}),
        };
      }
    });

    return markedDates;
  };

  // 日付が選択されたときの処理
  const handleDayPress = (day: DateData) => {
    setSelectedDate(day.dateString);
    onDayPress(day);
  };

  // 月が変わったときの処理
  const handleMonthChange = (month: DateData) => {
    setCurrentMonth(month.dateString.substring(0, 7)); // YYYY-MM形式で保存
  };

  // 選択日のイベントを取得
  const getSelectedDateEvents = () => {
    if (!selectedDate) return [];
    const formattedDate = selectedDate.replace(/-/g, '/');
    return events.filter(event => event.date === formattedDate);
  };

  const selectedDateEvents = getSelectedDateEvents();

  return (
    <View style={styles.container}>
      <Calendar
        theme={{
          calendarBackground: 'transparent',
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
        markedDates={getMarkedDates()}
        onDayPress={handleDayPress}
        onMonthChange={handleMonthChange}
        enableSwipeMonths={true}
        markingType={'multi-dot'}
      />

      {selectedDate && selectedDateEvents.length > 0 && (
        <View style={styles.selectedEventsContainer}>
          <Text style={styles.selectedDateTitle}>
            {new Date(selectedDate).toLocaleDateString('ja-JP', {
              month: 'long',
              day: 'numeric',
            })}
            のイベント
          </Text>
          {selectedDateEvents.map(event => (
            <TouchableOpacity key={event.id} style={styles.eventItem}>
              <View style={styles.eventTimeContainer}>
                <MaterialIcons
                  name="access-time"
                  size={14}
                  color="rgba(234, 234, 234, 0.6)"
                />
                <Text style={styles.eventTime}>{event.time}</Text>
              </View>
              <View style={styles.eventInfoContainer}>
                <Text style={styles.eventTitle} numberOfLines={1}>
                  {event.title}
                </Text>
                <View style={styles.eventDetails}>
                  <View style={styles.eventLocation}>
                    <MaterialIcons
                      name="place"
                      size={12}
                      color="rgba(234, 234, 234, 0.6)"
                    />
                    <Text style={styles.eventLocationText} numberOfLines={1}>
                      {event.location}
                    </Text>
                  </View>
                  <Text style={styles.eventPoints}>+{event.points} CIZ</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  selectedEventsContainer: {
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  selectedDateTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'rgb(234, 234, 234)',
    marginBottom: 12,
  },
  eventItem: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
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
  eventInfoContainer: {
    flex: 1,
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
  eventLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  eventLocationText: {
    fontSize: 12,
    color: 'rgba(234, 234, 234, 0.6)',
    marginLeft: 4,
  },
  eventPoints: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgb(108, 186, 162)',
    marginLeft: 8,
  },
});
