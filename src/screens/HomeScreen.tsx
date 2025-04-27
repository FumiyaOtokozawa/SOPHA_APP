import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import type {AppTheme} from '../theme';
import {Header} from '../components/common/Header';
import {Footer} from '../components/common/Footer';

// 仮のデータ型定義
type PointHistory = {
  id: string;
  date: string;
  title: string;
  points: number;
  type: 'earn' | 'use';
};

type EventHistory = {
  id: string;
  date: string;
  title: string;
  location: string;
  points: number;
};

type Event = {
  id: string;
  date: string;
  title: string;
  location: string;
  time: string;
  points: number;
  capacity: number;
  participantsCount: number;
  isRegistered?: boolean;
};

export const HomeScreen: React.FC = () => {
  const theme = useTheme<AppTheme>();
  const [activeTab, setActiveTab] = useState('home');
  const [activeSection, setActiveSection] = useState('points');
  const [todayEventsExpanded, setTodayEventsExpanded] = useState(false);
  const [registeredEventsExpanded, setRegisteredEventsExpanded] =
    useState(false);

  // 仮のデータ
  const totalPoints = 3500;
  const lastMonthChange = +450; // 過去1ヶ月の増減（プラスの場合）

  // ポイント履歴データを増やす
  const pointsHistory: PointHistory[] = [
    {
      id: '1',
      date: '2023/10/15',
      title: 'イベント参加ボーナス',
      points: 300,
      type: 'earn',
    },
    {
      id: '2',
      date: '2023/10/10',
      title: '月間ログインボーナス',
      points: 200,
      type: 'earn',
    },
    {
      id: '3',
      date: '2023/10/05',
      title: 'グッズ交換',
      points: 500,
      type: 'use',
    },
    {
      id: '4',
      date: '2023/10/01',
      title: 'アンケート回答',
      points: 100,
      type: 'earn',
    },
    {
      id: '5',
      date: '2023/09/28',
      title: 'イベント参加',
      points: 300,
      type: 'earn',
    },
    {
      id: '6',
      date: '2023/09/22',
      title: 'アプリ利用ボーナス',
      points: 150,
      type: 'earn',
    },
    {
      id: '7',
      date: '2023/09/18',
      title: 'SNSシェア特典',
      points: 80,
      type: 'earn',
    },
    {
      id: '8',
      date: '2023/09/15',
      title: 'デジタルコンテンツ購入',
      points: 350,
      type: 'use',
    },
    {
      id: '9',
      date: '2023/09/10',
      title: '誕生日特典',
      points: 500,
      type: 'earn',
    },
    {
      id: '10',
      date: '2023/09/05',
      title: 'ミッション達成',
      points: 200,
      type: 'earn',
    },
    {
      id: '11',
      date: '2023/09/01',
      title: '新規会員特典',
      points: 300,
      type: 'earn',
    },
    {
      id: '12',
      date: '2023/08/28',
      title: 'チケット交換',
      points: 600,
      type: 'use',
    },
    {
      id: '13',
      date: '2023/08/25',
      title: 'フィードバック特典',
      points: 120,
      type: 'earn',
    },
    {
      id: '14',
      date: '2023/08/20',
      title: '夏季限定キャンペーン',
      points: 450,
      type: 'earn',
    },
    {
      id: '15',
      date: '2023/08/15',
      title: 'プレミアム会員特典',
      points: 800,
      type: 'earn',
    },
    {
      id: '16',
      date: '2023/08/10',
      title: '友達紹介ボーナス',
      points: 250,
      type: 'earn',
    },
    {
      id: '17',
      date: '2023/08/05',
      title: 'オンラインセミナー参加',
      points: 180,
      type: 'earn',
    },
    {
      id: '18',
      date: '2023/08/01',
      title: 'グッズ交換',
      points: 400,
      type: 'use',
    },
    {
      id: '19',
      date: '2023/07/25',
      title: 'キャンペーン達成報酬',
      points: 350,
      type: 'earn',
    },
    {
      id: '20',
      date: '2023/07/20',
      title: 'アンケート回答',
      points: 100,
      type: 'earn',
    },
    {
      id: '21',
      date: '2023/07/15',
      title: 'イベント参加',
      points: 250,
      type: 'earn',
    },
    {
      id: '22',
      date: '2023/07/10',
      title: 'プレミアムサービス購入',
      points: 800,
      type: 'use',
    },
    {
      id: '23',
      date: '2023/07/05',
      title: 'ログインボーナス',
      points: 50,
      type: 'earn',
    },
    {
      id: '24',
      date: '2023/07/01',
      title: '月間ランキング特典',
      points: 500,
      type: 'earn',
    },
    {
      id: '25',
      date: '2023/06/25',
      title: '特別キャンペーン',
      points: 600,
      type: 'earn',
    },
  ];

  // イベント履歴データを増やす
  const eventsHistory: EventHistory[] = [
    {
      id: '1',
      date: '2023/10/15',
      title: '秋のミートアップ',
      location: '東京都渋谷区',
      points: 300,
    },
    {
      id: '2',
      date: '2023/09/20',
      title: '技術勉強会',
      location: '大阪市中央区',
      points: 250,
    },
    {
      id: '3',
      date: '2023/09/05',
      title: 'コミュニティフェス',
      location: '名古屋市中区',
      points: 400,
    },
    {
      id: '4',
      date: '2023/08/15',
      title: '夏の交流会',
      location: '福岡市博多区',
      points: 300,
    },
    {
      id: '5',
      date: '2023/08/01',
      title: 'ビジネスセミナー',
      location: '東京都千代田区',
      points: 350,
    },
    {
      id: '6',
      date: '2023/07/25',
      title: 'クリエイターズマーケット',
      location: '愛知県名古屋市',
      points: 280,
    },
    {
      id: '7',
      date: '2023/07/15',
      title: '音楽フェスティバル',
      location: '沖縄県那覇市',
      points: 500,
    },
    {
      id: '8',
      date: '2023/07/10',
      title: '国際カンファレンス',
      location: '京都市左京区',
      points: 450,
    },
    {
      id: '9',
      date: '2023/06/30',
      title: 'スタートアップピッチ',
      location: '東京都港区',
      points: 320,
    },
    {
      id: '10',
      date: '2023/06/20',
      title: 'デザインワークショップ',
      location: '神奈川県横浜市',
      points: 280,
    },
    {
      id: '11',
      date: '2023/06/15',
      title: 'マーケティングセミナー',
      location: '東京都新宿区',
      points: 300,
    },
    {
      id: '12',
      date: '2023/06/05',
      title: 'プロダクト発表会',
      location: '東京都品川区',
      points: 350,
    },
    {
      id: '13',
      date: '2023/05/25',
      title: 'ウェブ開発勉強会',
      location: '大阪府大阪市',
      points: 280,
    },
    {
      id: '14',
      date: '2023/05/15',
      title: 'アプリ開発フォーラム',
      location: '東京都中央区',
      points: 320,
    },
    {
      id: '15',
      date: '2023/05/10',
      title: 'スタートアップ交流会',
      location: '福岡県福岡市',
      points: 250,
    },
    {
      id: '16',
      date: '2023/05/01',
      title: '春のネットワーキング',
      location: '北海道札幌市',
      points: 300,
    },
    {
      id: '17',
      date: '2023/04/20',
      title: 'データサイエンス講座',
      location: '東京都文京区',
      points: 400,
    },
    {
      id: '18',
      date: '2023/04/10',
      title: 'ビジネスコンテスト',
      location: '東京都港区',
      points: 450,
    },
    {
      id: '19',
      date: '2023/04/05',
      title: 'UI/UXデザインワークショップ',
      location: '京都府京都市',
      points: 280,
    },
    {
      id: '20',
      date: '2023/04/01',
      title: '年度初めネットワーキング',
      location: '東京都渋谷区',
      points: 320,
    },
  ];

  // 本日開催予定のイベント
  const todayEvents: Event[] = [
    {
      id: 't1',
      date: '2023/10/18',
      title: 'プログラミング入門講座',
      location: '東京都渋谷区',
      time: '13:00-15:00',
      points: 200,
      capacity: 30,
      participantsCount: 18,
    },
    {
      id: 't2',
      date: '2023/10/18',
      title: 'ネットワーキングランチ',
      location: '東京都中央区',
      time: '12:00-14:00',
      points: 150,
      capacity: 20,
      participantsCount: 15,
    },
    {
      id: 't3',
      date: '2023/10/18',
      title: 'キャリア相談会',
      location: '東京都新宿区',
      time: '18:00-20:00',
      points: 250,
      capacity: 15,
      participantsCount: 8,
    },
    {
      id: 't4',
      date: '2023/10/18',
      title: 'スタートアップ交流会',
      location: '東京都港区',
      time: '19:00-21:00',
      points: 300,
      capacity: 40,
      participantsCount: 32,
    },
    {
      id: 't5',
      date: '2023/10/18',
      title: 'デザイン思考ワークショップ',
      location: '東京都品川区',
      time: '14:00-17:00',
      points: 280,
      capacity: 25,
      participantsCount: 21,
    },
    {
      id: 't6',
      date: '2023/10/18',
      title: 'AIセミナー',
      location: '東京都千代田区',
      time: '16:00-18:00',
      points: 220,
      capacity: 35,
      participantsCount: 22,
    },
    {
      id: 't7',
      date: '2023/10/18',
      title: 'ビジネスネットワーキング',
      location: '東京都中央区',
      time: '18:30-20:30',
      points: 250,
      capacity: 30,
      participantsCount: 25,
    },
  ];

  // 参加予定のイベント
  const registeredEvents: Event[] = [
    {
      id: 'r1',
      date: '2023/10/20',
      title: 'AIと未来社会セミナー',
      location: '東京都千代田区',
      time: '15:00-17:00',
      points: 250,
      capacity: 50,
      participantsCount: 42,
      isRegistered: true,
    },
    {
      id: 'r2',
      date: '2023/10/25',
      title: '最新テクノロジー展示会',
      location: '東京都江東区',
      time: '10:00-18:00',
      points: 350,
      capacity: 200,
      participantsCount: 156,
      isRegistered: true,
    },
    {
      id: 'r3',
      date: '2023/11/02',
      title: 'ビジネスモデル構築講座',
      location: '東京都港区',
      time: '14:00-16:30',
      points: 300,
      capacity: 35,
      participantsCount: 28,
      isRegistered: true,
    },
    {
      id: 'r4',
      date: '2023/11/10',
      title: 'デザイナーズミートアップ',
      location: '東京都目黒区',
      time: '18:30-20:30',
      points: 220,
      capacity: 40,
      participantsCount: 36,
      isRegistered: true,
    },
    {
      id: 'r5',
      date: '2023/11/15',
      title: 'マーケティング戦略セミナー',
      location: '東京都新宿区',
      time: '13:30-16:00',
      points: 280,
      capacity: 45,
      participantsCount: 32,
      isRegistered: true,
    },
    {
      id: 'r6',
      date: '2023/11/20',
      title: 'スタートアップ資金調達講座',
      location: '東京都渋谷区',
      time: '14:00-16:00',
      points: 300,
      capacity: 30,
      participantsCount: 25,
      isRegistered: true,
    },
  ];

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

  const renderPointHistoryItem = ({item}: {item: PointHistory}) => (
    <View style={styles.history__item}>
      <View style={styles.history__itemHeader}>
        <Text style={styles.history__date}>{item.date}</Text>
        <Text
          style={[
            styles.history__points,
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
      <Text style={styles.history__title}>{item.title}</Text>
    </View>
  );

  const renderEventHistoryItem = ({item}: {item: EventHistory}) => (
    <View style={styles.history__item}>
      <View style={styles.history__itemHeader}>
        <Text style={styles.history__date}>{item.date}</Text>
        <Text style={[styles.history__points, {color: theme.colors.success}]}>
          +{item.points} CIZ
        </Text>
      </View>
      <Text style={styles.history__title}>{item.title}</Text>
      <View style={styles.history__location}>
        <MaterialIcons
          name="place"
          size={14}
          color="rgba(234, 234, 234, 0.6)"
        />
        <Text style={styles.history__locationText}>{item.location}</Text>
      </View>
    </View>
  );

  const renderEventItem = ({item}: {item: Event}) => (
    <View style={styles.event__item}>
      <View style={styles.event__header}>
        <Text style={styles.event__title}>{item.title}</Text>
        <Text style={styles.event__points}>+{item.points} CIZ</Text>
      </View>
      <View style={styles.event__subInfo}>
        <Text style={styles.event__time}>{item.time}</Text>
        <View style={styles.event__capacity}>
          <MaterialIcons
            name="people"
            size={12}
            color="rgba(234, 234, 234, 0.6)"
          />
          <Text style={styles.event__capacityText}>
            {item.participantsCount}/{item.capacity}
          </Text>
        </View>
      </View>
      <View style={styles.event__location}>
        <MaterialIcons
          name="place"
          size={12}
          color="rgba(234, 234, 234, 0.6)"
        />
        <Text style={styles.event__locationText}>{item.location}</Text>
      </View>
      {item.isRegistered && (
        <View style={styles.event__registeredBadge}>
          <MaterialIcons
            name="check-circle"
            size={10}
            color={theme.colors.success}
          />
          <Text style={styles.event__registeredText}>参加登録済み</Text>
        </View>
      )}
    </View>
  );

  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <View style={styles.wrapper}>
        <Header />
        <ScrollView
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <View style={styles.points__container}>
              <View style={styles.points__card}>
                <Text style={styles.points__title}>所持ポイント</Text>
                <View style={styles.points__valueContainer}>
                  <Text style={styles.points__value}>{totalPoints}</Text>
                  <Text style={styles.points__unit}>CIZ</Text>
                </View>
                <View style={styles.points__monthlyChange}>
                  <Text style={styles.points__monthlyLabel}>
                    過去1ヶ月の増減:
                  </Text>
                  <Text
                    style={[
                      styles.points__monthlyValue,
                      {
                        color:
                          lastMonthChange >= 0
                            ? theme.colors.success
                            : theme.colors.error,
                      },
                    ]}>
                    {lastMonthChange >= 0 ? '+' : ''}
                    {lastMonthChange} CIZ
                  </Text>
                </View>
              </View>
            </View>

            <TouchableOpacity
              style={styles.collapsible__header}
              onPress={toggleTodayEvents}
              activeOpacity={0.7}>
              <View style={styles.section__header}>
                <MaterialIcons
                  name="event"
                  size={20}
                  color={theme.colors.primary}
                />
                <Text style={styles.section__title}>
                  本日開催予定のイベント
                </Text>
              </View>
              <MaterialIcons
                name={
                  todayEventsExpanded
                    ? 'keyboard-arrow-up'
                    : 'keyboard-arrow-down'
                }
                size={24}
                color="rgba(234, 234, 234, 0.7)"
              />
            </TouchableOpacity>

            {todayEventsExpanded && (
              <FlatList
                data={todayEvents}
                renderItem={renderEventItem}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.todayEvents__list}
              />
            )}

            <TouchableOpacity
              style={styles.collapsible__header}
              onPress={toggleRegisteredEvents}
              activeOpacity={0.7}>
              <View style={styles.section__header}>
                <MaterialIcons
                  name="bookmark"
                  size={20}
                  color={theme.colors.primary}
                />
                <Text style={styles.section__title}>参加予定のイベント</Text>
              </View>
              <MaterialIcons
                name={
                  registeredEventsExpanded
                    ? 'keyboard-arrow-up'
                    : 'keyboard-arrow-down'
                }
                size={24}
                color="rgba(234, 234, 234, 0.7)"
              />
            </TouchableOpacity>

            {registeredEventsExpanded && (
              <FlatList
                data={registeredEvents}
                renderItem={renderEventItem}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.registeredEvents__list}
              />
            )}

            <View style={styles.history__container}>
              <View style={styles.history__tabs}>
                <TouchableOpacity
                  style={[
                    styles.history__tab,
                    activeSection === 'points' && styles.history__tabActive,
                  ]}
                  onPress={() => handleSectionChange('points')}>
                  <Text
                    style={[
                      styles.history__tabText,
                      activeSection === 'points' &&
                        styles.history__tabTextActive,
                    ]}>
                    ポイント履歴
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.history__tab,
                    activeSection === 'events' && styles.history__tabActive,
                  ]}
                  onPress={() => handleSectionChange('events')}>
                  <Text
                    style={[
                      styles.history__tabText,
                      activeSection === 'events' &&
                        styles.history__tabTextActive,
                    ]}>
                    イベント履歴
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.history__list}>
                {activeSection === 'points' ? (
                  <FlatList
                    data={pointsHistory}
                    renderItem={renderPointHistoryItem}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={false}
                    nestedScrollEnabled={true}
                  />
                ) : (
                  <FlatList
                    data={eventsHistory}
                    renderItem={renderEventHistoryItem}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={false}
                    nestedScrollEnabled={true}
                  />
                )}
              </View>
            </View>
          </View>
        </ScrollView>
        <Footer activeTab={activeTab} onTabPress={handleTabPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    width: '100%',
  },
  scrollContainer: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  points__container: {
    marginTop: 24,
    marginBottom: 16,
  },
  points__card: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  points__title: {
    fontSize: 16,
    fontWeight: '500',
    color: 'rgb(234, 234, 234)',
    marginBottom: 8,
  },
  points__valueContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  points__value: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'rgb(234, 234, 234)',
  },
  points__unit: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'rgb(234, 234, 234)',
    marginLeft: 4,
    marginBottom: 4,
  },
  points__monthlyChange: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    justifyContent: 'flex-end',
  },
  points__monthlyLabel: {
    fontSize: 13,
    color: 'rgba(234, 234, 234, 0.7)',
  },
  points__monthlyValue: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  collapsible__header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 4,
    marginBottom: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
  },
  section__header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  section__title: {
    fontSize: 16,
    fontWeight: '600',
    color: 'rgb(234, 234, 234)',
    marginLeft: 8,
  },
  todayEvents__list: {
    paddingVertical: 12,
    paddingRight: 16,
    marginBottom: 16,
  },
  registeredEvents__list: {
    paddingVertical: 12,
    paddingRight: 16,
    marginBottom: 16,
  },
  event__item: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    width: 240,
    marginRight: 8,
  },
  event__header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  event__title: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgb(234, 234, 234)',
    flex: 1,
    marginRight: 4,
  },
  event__points: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgb(108, 186, 162)',
  },
  event__subInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  event__time: {
    fontSize: 12,
    color: 'rgba(234, 234, 234, 0.7)',
  },
  event__capacity: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  event__capacityText: {
    fontSize: 11,
    color: 'rgba(234, 234, 234, 0.6)',
    marginLeft: 3,
  },
  event__location: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  event__locationText: {
    fontSize: 11,
    color: 'rgba(234, 234, 234, 0.6)',
    marginLeft: 3,
    flex: 1,
  },
  event__registeredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(108, 186, 162, 0.15)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  event__registeredText: {
    fontSize: 10,
    color: 'rgb(108, 186, 162)',
    marginLeft: 3,
    fontWeight: '500',
  },
  history__container: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  history__tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  history__tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  history__tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: 'rgb(84, 98, 224)',
  },
  history__tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(234, 234, 234, 0.6)',
  },
  history__tabTextActive: {
    color: 'rgb(234, 234, 234)',
  },
  history__list: {
    padding: 16,
    maxHeight: 400,
  },
  history__item: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
  },
  history__itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  history__date: {
    fontSize: 12,
    color: 'rgba(234, 234, 234, 0.6)',
  },
  history__points: {
    fontSize: 14,
    fontWeight: '600',
  },
  history__title: {
    fontSize: 15,
    fontWeight: '500',
    color: 'rgb(234, 234, 234)',
    marginBottom: 4,
  },
  history__location: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  history__locationText: {
    fontSize: 12,
    color: 'rgba(234, 234, 234, 0.6)',
    marginLeft: 2,
  },
});
