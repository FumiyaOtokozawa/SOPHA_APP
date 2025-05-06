/**
 * イベント詳細画面コンポーネント
 * イベントの詳細情報を表示し、参加登録などのアクションを提供する
 * EVENT_LIST_DETAILテーブルのデータに基づいて情報を表示
 */

import React, {useState, useEffect, useCallback, useRef, useMemo} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  Alert,
  Animated,
  Linking,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {RouteProp, useRoute} from '@react-navigation/core';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from '../styles/screens/event/EventDetailScreenStyle';
import {EventDetailData} from '../components/event/EventDetailView';
import {getEventById, getMemberNames} from '../services/eventService';
import {LoadingOverlay} from '../components/common/LoadingOverlay';
import {format, isSameDay} from 'date-fns';
import {ja} from 'date-fns/locale';

// 定数
const HEADER_MAX_HEIGHT = 180; // ヘッダーの最大高さ
const HEADER_MIN_HEIGHT = 60; // ヘッダーの最小高さ
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT; // スクロール距離

// イベント詳細画面のルートパラムの型定義
type EventDetailRouteProp = RouteProp<
  {
    EventDetail: {
      eventId: string;
    };
  },
  'EventDetail'
>;

export const EventDetailScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<EventDetailRouteProp>();
  const {eventId} = route.params;
  const [isRegistered, setIsRegistered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [eventData, setEventData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState<
    Array<{id: number; myoji: string; namae: string}>
  >([]);

  // アニメーション用のスクロール位置
  const scrollY = useRef(new Animated.Value(0)).current;

  // ヘッダー高さをスクロール位置にマッピング
  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  // ヘッダーの不透明度をスクロール位置にマッピング
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 0.5, 0],
    extrapolate: 'clamp',
  });

  // グラデーション位置をスクロール位置にマッピング
  const gradientPosition = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [130, HEADER_MIN_HEIGHT - 20],
    extrapolate: 'clamp',
  });

  // イベント情報の取得
  useEffect(() => {
    const loadEvent = async () => {
      try {
        setLoading(true);
        // 数値に変換
        const numericEventId = parseInt(eventId, 10);
        if (isNaN(numericEventId)) {
          throw new Error('無効なイベントIDです');
        }

        // Supabaseからイベント情報を取得
        const eventDetail = await getEventById(numericEventId);

        if (!eventDetail) {
          throw new Error('イベント情報が見つかりませんでした');
        }

        // 運営メンバーIDをパースして配列に変換
        let memberIds: number[] = [];
        if (eventDetail.mng_memb) {
          try {
            // まずJSONとしてパースを試みる
            memberIds = JSON.parse(eventDetail.mng_memb);
          } catch (error) {
            // JSONパースに失敗した場合はカンマ区切りテキストとして処理
            memberIds = eventDetail.mng_memb
              .split(',')
              .map(id => parseInt(id.trim(), 10))
              .filter(id => !isNaN(id)); // 無効な値をフィルタリング
          }
        }

        // 運営メンバー情報を取得
        if (memberIds && memberIds.length > 0) {
          const memberInfo = await getMemberNames(memberIds);
          setMembers(memberInfo);
        }

        // イベントデータを設定（EventDetailData型への変換はuseMemoで行う）
        setEventData(eventDetail);

        // イベント参加ステータス（今後実装）
        setIsRegistered(false);
        setIsFavorite(false);
      } catch (error) {
        console.error('イベント情報の取得に失敗しました', error);
        Alert.alert('エラー', 'イベント情報の取得に失敗しました');
        navigation.goBack();
      } finally {
        setLoading(false);
      }
    };

    loadEvent();
  }, [eventId, navigation]);

  // イベントデータを処理
  const event = useMemo<EventDetailData | null>(() => {
    if (!eventData) return null;

    return {
      id: eventData.event_id.toString(),
      title: eventData.title,
      description: eventData.description || '説明はありません',
      genre: eventData.genre || 'unofficial',
      format: eventData.format || 'offline',
      owner: {
        id: eventData.owner,
        name:
          eventData.owner_myoji && eventData.owner_namae
            ? `${eventData.owner_myoji} ${eventData.owner_namae}`
            : '主催者',
      },
      url: eventData.url || undefined,
      place: eventData.place_nm
        ? eventData.place_nm
        : `会場ID: ${eventData.place_id || 'なし'}`,
      placeId: eventData.place_id || undefined,
      address: eventData.address || undefined,
      startDate: new Date(eventData.start_date),
      endDate: new Date(eventData.end_date),
      mngMembers: members.map(member => ({
        id: member.id,
        name: `${member.myoji} ${member.namae}`,
      })),
      favCount: eventData.fav_cnt || 0,
      createdAt: new Date(eventData.created_at),
      updatedAt: eventData.updated_at
        ? new Date(eventData.updated_at)
        : new Date(eventData.created_at),
    };
  }, [eventData, members]);

  // 戻るボタンの処理
  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  // いいねボタンの処理
  const handleFavoriteToggle = useCallback(() => {
    setIsFavorite(prev => !prev);
    // API連携処理（実際の実装では必要）
  }, []);

  // 参加登録ボタンの処理
  const handleRegisterToggle = useCallback(() => {
    setIsRegistered(prev => !prev);
    Alert.alert(
      '確認',
      isRegistered
        ? 'イベントのキャンセル処理は現在開発中です'
        : 'イベントへの参加登録処理は現在開発中です',
    );
    // API連携処理（実際の実装では必要）
  }, [isRegistered]);

  // ローディング中表示
  if (loading) {
    return (
      <LoadingOverlay message="イベント情報を読み込み中..." iconName="event" />
    );
  }

  if (!event) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <MaterialIcons
            name="error-outline"
            size={48}
            color="rgba(225, 102, 108, 0.7)"
          />
          <Text style={{color: 'rgb(234, 234, 234)', marginTop: 16}}>
            イベント情報が見つかりませんでした
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  // 開始日と終了日が同じか確認
  const isSameDateEvent = isSameDay(event.startDate, event.endDate);

  // 日時表示の整形
  const formattedStartDate = format(event.startDate, 'yyyy年M月d日(E)', {
    locale: ja,
  });
  const formattedStartTime = format(event.startDate, 'HH:mm', {locale: ja});
  const formattedEndDate = format(event.endDate, 'yyyy年M月d日(E)', {
    locale: ja,
  });
  const formattedEndTime = format(event.endDate, 'HH:mm', {locale: ja});

  const dateTimeDisplay = isSameDateEvent
    ? `${formattedStartDate} ${formattedStartTime}～${formattedEndTime}`
    : `${formattedStartDate} ${formattedStartTime}～${formattedEndDate} ${formattedEndTime}`;

  return (
    <SafeAreaView style={styles.container}>
      {/* ヘッダーイメージ（アニメーション付き） */}
      <Animated.View
        style={[
          {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: headerHeight,
            opacity: headerOpacity,
            zIndex: 1,
            overflow: 'hidden',
          },
        ]}>
        <ImageBackground
          source={{
            uri: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
          }}
          style={styles.headerImage}>
          <Animated.View
            style={[
              styles.gradient,
              {
                top: gradientPosition,
              },
            ]}>
            <LinearGradient
              colors={['rgba(36, 37, 41, 0)', 'rgba(36, 37, 41, 1)']}
              style={{width: '100%', height: '100%'}}
            />
          </Animated.View>
        </ImageBackground>
      </Animated.View>

      {/* 戻るボタン */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={handleGoBack}
        activeOpacity={0.7}>
        <MaterialIcons name="arrow-back" size={24} color="rgb(234, 234, 234)" />
      </TouchableOpacity>

      {/* イベント詳細 */}
      <Animated.ScrollView
        scrollEventThrottle={16}
        contentContainerStyle={[
          styles.scrollContainer,
          {paddingTop: HEADER_MAX_HEIGHT}, // ヘッダーの高さ分のパディングを追加
        ]}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}>
        {/* タイトルセクション */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{event.title}</Text>

          {/* タグとホスト情報の行 */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginTop: 8,
            }}>
            {/* タグ表示 */}
            <View style={styles.tagContainer}>
              {/* ジャンルタグ */}
              <View style={[styles.tag, styles.genreTag]}>
                <Text style={[styles.tagText, styles.genreTagText]}>
                  {event.genre === 'official' ? '公式イベント' : '有志イベント'}
                </Text>
              </View>

              {/* 開催形式タグ */}
              <View style={[styles.tag, styles.formatTag]}>
                <Text style={[styles.tagText, styles.formatTagText]}>
                  {event.format === 'online'
                    ? 'オンライン'
                    : event.format === 'offline'
                    ? 'オフライン'
                    : 'ハイブリッド'}
                </Text>
              </View>
            </View>

            {/* 主催者情報 - タイトルの右下に配置 */}
            <View style={localStyles.hostContainer}>
              <View style={styles.ownerAvatar} />
              <View>
                <Text style={localStyles.hostLabel}>主催者</Text>
                <Text style={localStyles.hostName}>{event.owner.name}</Text>
              </View>
            </View>
          </View>

          {/* いいね表示 */}
          <View style={styles.favoriteContainer}>
            <TouchableOpacity onPress={handleFavoriteToggle}>
              <MaterialIcons
                name={isFavorite ? 'favorite' : 'favorite-border'}
                size={18}
                color={
                  isFavorite ? 'rgb(225, 102, 108)' : 'rgba(234, 234, 234, 0.5)'
                }
              />
            </TouchableOpacity>
            <Text style={styles.favoriteCount}>{event.favCount}</Text>
          </View>
        </View>

        {/* 基本情報セクション */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>イベント情報</Text>

          {/* 日時 */}
          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <MaterialIcons
                name="access-time"
                size={18}
                color="rgb(84, 98, 224)"
              />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>開催日時</Text>
              <Text style={styles.infoValue}>{dateTimeDisplay}</Text>
            </View>
          </View>

          {/* 会場 */}
          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <MaterialIcons name="place" size={18} color="rgb(84, 98, 224)" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>開催場所</Text>
              <Text style={styles.infoValue}>{event.place}</Text>
              {event.address && (
                <Text style={styles.infoValueSmall}>{event.address}</Text>
              )}
            </View>
          </View>

          {/* URLがある場合 */}
          {event.url && (
            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <MaterialIcons name="link" size={18} color="rgb(84, 98, 224)" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>関連リンク</Text>
                <TouchableOpacity
                  style={localStyles.urlContainer}
                  onPress={() => Linking.openURL(event.url!)}>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={localStyles.urlText}>
                    {event.url}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* 運営メンバー */}
          {members.length > 0 && (
            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <MaterialIcons
                  name="group"
                  size={18}
                  color="rgb(84, 98, 224)"
                />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>運営メンバー</Text>
                <View style={styles.memberList}>
                  {members.map(member => (
                    <View key={member.id} style={styles.memberChip}>
                      <View style={styles.memberAvatar} />
                      <Text style={styles.memberName}>
                        {`${member.myoji} ${member.namae}`}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          )}
        </View>

        {/* 説明セクション */}
        <View style={styles.descriptionSection}>
          <Text style={styles.sectionTitle}>イベント詳細</Text>
          <Text style={styles.description}>{event.description}</Text>
        </View>

        {/* メタデータセクション */}
        <View style={styles.metaSection}>
          <Text style={styles.metaInfo}>
            作成日時:{' '}
            {event.createdAt.toLocaleString('ja-JP', {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
          <Text style={styles.metaInfo}>
            更新日時:{' '}
            {event.updatedAt.toLocaleString('ja-JP', {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </View>
      </Animated.ScrollView>

      {/* アクションボタン */}
      <View style={styles.actionButtonContainer}>
        <TouchableOpacity
          style={[
            styles.actionButton,
            isRegistered ? styles.cancelButton : styles.registerButton,
          ]}
          onPress={handleRegisterToggle}
          activeOpacity={0.8}>
          <Text style={styles.actionButtonText}>
            {isRegistered ? 'キャンセルする' : 'イベントに参加する'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// ローカルスタイル定義
const localStyles = StyleSheet.create({
  hostContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(84, 98, 224, 0.1)',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginLeft: 8,
  },
  hostLabel: {
    fontSize: 10,
    color: 'rgba(234, 234, 234, 0.6)',
  },
  hostName: {
    fontSize: 12,
    color: 'rgb(234, 234, 234)',
    fontWeight: '500',
  },
  urlContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(84, 98, 224, 0.5)',
    marginTop: 4,
    paddingBottom: 4,
    maxWidth: '100%',
  },
  urlText: {
    color: 'rgb(84, 98, 224)',
    fontSize: 14,
  },
});
