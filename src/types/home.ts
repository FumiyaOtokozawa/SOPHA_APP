/**
 * ホーム画面で使用するデータ型の定義ファイル
 * ポイント履歴、イベント履歴、イベントの型定義を含む
 */

// ポイント履歴データ型
export type PointHistory = {
  id: string;
  date: string;
  title: string;
  points: number;
  type: 'earn' | 'use';
};

// イベント履歴データ型
export type EventHistory = {
  id: string;
  date: string;
  title: string;
  location: string;
  points: number;
};

// イベントデータ型
export type Event = {
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
