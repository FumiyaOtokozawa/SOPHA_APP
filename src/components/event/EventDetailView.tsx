/**
 * イベント詳細表示コンポーネント
 * イベントの詳細情報を表示する再利用可能なコンポーネント
 * EVENT_LIST_DETAILテーブルの情報を表示する
 */

import React, {useCallback} from 'react';
import {View, Text, TouchableOpacity, ScrollView, Linking} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {format} from 'date-fns';
import {ja} from 'date-fns/locale';
import {styles} from '../../styles/screens/event/EventDetailScreenStyle';

// イベント詳細データの型定義
export interface EventDetailData {
  id: string;
  title: string;
  genre: string; // 'official' or 'unofficial'
  format: string; // 'online' or 'offline' or 'hybrid'
  startDate: Date;
  endDate: Date;
  place: string;
  placeId?: number;
  owner: {
    id: number;
    name: string;
  };
  description: string;
  url?: string;
  mngMembers?: Array<{id: number; name: string}>;
  favCount: number;
  createdAt: Date;
  updatedAt: Date;
  isRegistered?: boolean;
  isFavorite?: boolean;
}

interface EventDetailViewProps {
  event: EventDetailData;
  isFavorite: boolean;
  onFavoriteToggle: () => void;
}

// フォーマット（開催形式）の表示用マッピング
const formatLabels: {[key: string]: string} = {
  online: 'オンライン',
  offline: 'オフライン',
  hybrid: 'ハイブリッド',
};

// ジャンルの表示用マッピング
const genreLabels: {[key: string]: string} = {
  official: '公式イベント',
  unofficial: '有志イベント',
};

export const EventDetailView: React.FC<EventDetailViewProps> = ({
  event,
  isFavorite,
  onFavoriteToggle,
}) => {
  // URLリンクオープン処理
  const handleOpenUrl = useCallback(async (url: string) => {
    if (await Linking.canOpenURL(url)) {
      await Linking.openURL(url);
    }
  }, []);

  // 日付のフォーマット
  const formatDateTime = useCallback((date: Date) => {
    return format(date, 'yyyy年M月d日(E) HH:mm', {locale: ja});
  }, []);

  return (
    <ScrollView
      style={{flex: 1}}
      contentContainerStyle={styles.contentContainer}>
      {/* タイトルセクション */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{event.title}</Text>

        {/* タグ表示 */}
        <View style={styles.tagContainer}>
          {/* ジャンルタグ */}
          <View style={[styles.tag, styles.genreTag]}>
            <Text style={[styles.tagText, styles.genreTagText]}>
              {genreLabels[event.genre] || event.genre}
            </Text>
          </View>

          {/* 開催形式タグ */}
          <View style={[styles.tag, styles.formatTag]}>
            <Text style={[styles.tagText, styles.formatTagText]}>
              {formatLabels[event.format] || event.format}
            </Text>
          </View>
        </View>

        {/* いいね表示 */}
        <View style={styles.favoriteContainer}>
          <TouchableOpacity onPress={onFavoriteToggle}>
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
            <Text style={styles.infoValue}>
              {formatDateTime(event.startDate)}
            </Text>
            <Text style={styles.infoValue}>
              ～ {formatDateTime(event.endDate)}
            </Text>
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
          </View>
        </View>

        {/* 主催者 */}
        <View style={styles.infoRow}>
          <View style={styles.infoIcon}>
            <MaterialIcons name="person" size={18} color="rgb(84, 98, 224)" />
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>主催者</Text>
            <View style={styles.ownerContainer}>
              <View style={styles.ownerAvatar} />
              <View style={styles.ownerInfo}>
                <Text style={styles.ownerName}>{event.owner.name}</Text>
              </View>
            </View>
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
                style={styles.urlButton}
                onPress={() => handleOpenUrl(event.url!)}>
                <MaterialIcons
                  name="open-in-new"
                  size={14}
                  color="rgb(84, 98, 224)"
                />
                <Text style={styles.urlButtonText}>リンクを開く</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* 運営メンバー */}
        {event.mngMembers && event.mngMembers.length > 0 && (
          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <MaterialIcons name="group" size={18} color="rgb(84, 98, 224)" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>運営メンバー</Text>
              <View style={styles.memberList}>
                {event.mngMembers.map(member => (
                  <View key={member.id} style={styles.memberChip}>
                    <View style={styles.memberAvatar} />
                    <Text style={styles.memberName}>{member.name}</Text>
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
          作成日時: {format(event.createdAt, 'yyyy/MM/dd HH:mm')}
        </Text>
        <Text style={styles.metaInfo}>
          更新日時: {format(event.updatedAt, 'yyyy/MM/dd HH:mm')}
        </Text>
      </View>
    </ScrollView>
  );
};
