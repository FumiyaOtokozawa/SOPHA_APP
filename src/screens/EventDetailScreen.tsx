/**
 * イベント詳細画面コンポーネント
 * イベントの詳細情報を表示し、参加登録などのアクションを提供する
 * EVENT_LIST_DETAILテーブルのデータに基づいて情報を表示
 */

import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {RouteProp, useRoute} from '@react-navigation/core';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from '../styles/screens/event/EventDetailScreenStyle';
import {
  EventDetailView,
  EventDetailData,
} from '../components/event/EventDetailView';
import {getEventById} from '../services/eventService';
import {LoadingOverlay} from '../components/common/LoadingOverlay';

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
  const [event, setEvent] = useState<EventDetailData | null>(null);
  const [loading, setLoading] = useState(true);

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

        // イベント詳細データに変換
        const eventData: EventDetailData = {
          id: eventDetail.event_id.toString(),
          title: eventDetail.title,
          description: eventDetail.description || '説明はありません',
          genre: eventDetail.genre || 'unofficial',
          format: eventDetail.format || 'offline',
          owner: {
            id: eventDetail.owner,
            name: '主催者', // 実際にはユーザー情報を取得する必要あり
          },
          url: eventDetail.url || undefined,
          place: `会場ID: ${eventDetail.place_id || 'なし'}`,
          placeId: eventDetail.place_id || undefined,
          startDate: new Date(eventDetail.start_date),
          endDate: new Date(eventDetail.end_date),
          mngMembers: eventDetail.mng_memb
            ? JSON.parse(eventDetail.mng_memb).map((id: number) => ({
                id,
                name: `運営メンバー${id}`, // 実際にはユーザー情報を取得する必要あり
              }))
            : [],
          favCount: eventDetail.fav_cnt || 0,
          createdAt: new Date(eventDetail.created_at),
          updatedAt: eventDetail.updated_at
            ? new Date(eventDetail.updated_at)
            : new Date(eventDetail.created_at),
        };

        setEvent(eventData);

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

  return (
    <SafeAreaView style={styles.container}>
      {/* ヘッダーイメージ（デモ用） */}
      <ImageBackground
        source={{
          uri: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
        }}
        style={styles.headerImage}>
        <LinearGradient
          colors={['rgba(36, 37, 41, 0)', 'rgba(36, 37, 41, 1)']}
          style={styles.gradient}
        />
      </ImageBackground>

      {/* 戻るボタン */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={handleGoBack}
        activeOpacity={0.7}>
        <MaterialIcons name="arrow-back" size={24} color="rgb(234, 234, 234)" />
      </TouchableOpacity>

      {/* イベント詳細表示 */}
      <EventDetailView
        event={event}
        isFavorite={isFavorite}
        onFavoriteToggle={handleFavoriteToggle}
      />

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
