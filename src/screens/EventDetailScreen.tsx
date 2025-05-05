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
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {RouteProp, useRoute} from '@react-navigation/core';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from '../styles/screens/event/EventDetailScreenStyle';
import {allCalendarEvents} from '../constants/mockData'; // 仮実装としてモックデータを使用
import {
  EventDetailView,
  EventDetailData,
} from '../components/event/EventDetailView';

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

  // イベント情報の取得 (実際のアプリではAPIから取得)
  useEffect(() => {
    const loadEvent = async () => {
      try {
        // モックデータからイベント情報を取得（実際の実装ではAPI呼び出し）
        const foundEvent = allCalendarEvents.find(e => e.id === eventId);
        if (foundEvent) {
          // 詳細情報を追加（実際の実装ではAPI呼び出しで詳細情報を取得）
          const eventDetail: EventDetailData = {
            id: foundEvent.id,
            title: foundEvent.title,
            // モックデータの対応フィールドが無いものは独自で設定
            description:
              '本イベントの概要です。参加者同士の交流を深め、知識を共有する場として設定されています。',
            genre: 'official', // 'official' or 'unofficial'
            format: 'hybrid', // 'online' or 'offline' or 'hybrid'
            owner: {
              id: 1,
              name: '山田 太郎',
            },
            url: 'https://example.com/event',
            place: foundEvent.location,
            placeId: 1,
            startDate: new Date(
              `${foundEvent.date} ${foundEvent.time.split('-')[0]}`,
            ),
            endDate: new Date(
              `${foundEvent.date} ${foundEvent.time.split('-')[1]}`,
            ),
            mngMembers: [
              {id: 2, name: '佐藤 次郎'},
              {id: 3, name: '鈴木 三郎'},
            ],
            favCount: 12,
            createdAt: new Date('2023/10/15 09:30:00'),
            updatedAt: new Date('2023/10/18 14:20:00'),
          };
          setEvent(eventDetail);
          // イベント参加ステータス（実際はユーザーID基準で判定）
          setIsRegistered(foundEvent.isRegistered || false);
          setIsFavorite(false);
        }
        setLoading(false);
      } catch (error) {
        console.error('イベント情報の取得に失敗しました', error);
        setLoading(false);
      }
    };

    loadEvent();
  }, [eventId]);

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
    // API連携処理（実際の実装では必要）
  }, []);

  // ローディング中表示
  if (loading || !event) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <MaterialIcons
            name="event"
            size={48}
            color="rgba(234, 234, 234, 0.3)"
          />
          <Text style={{color: 'rgb(234, 234, 234)', marginTop: 16}}>
            イベント情報を読み込み中...
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
