/**
 * イベントサービス
 * イベント関連のデータをSupabaseから取得・保存する機能を提供する
 * EVENT_LIST_DETAILテーブルとのやり取りを担当
 */

import {supabase} from '../lib/supabase';
import {EventFormValues} from '../components/event/EventForm';

// EVENT_LIST_DETAILテーブルの型定義
export type EventDetail = {
  event_id: number;
  title: string;
  owner: number;
  start_date: string;
  end_date: string;
  description: string | null;
  genre: string | null;
  repeat_id: number | null;
  format: string | null;
  url: string | null;
  place_rad: number | null;
  place_id: number | null;
  mng_memb: string | null;
  plan_id: number | null;
  created_at: string;
  created_by: number | null;
  updated_at: string | null;
  updated_by: number | null;
  act_kbn: boolean;
  fav_cnt: number;
};

/**
 * イベントを作成する
 * @param formValues イベントフォームの値
 * @param userId 現在ログインしているユーザーID
 * @returns 作成されたイベントのID
 */
export const createEvent = async (
  formValues: EventFormValues,
  userId: number,
): Promise<number | null> => {
  try {
    // FormValuesからSupabase用のデータに変換
    const eventData = {
      title: formValues.title,
      owner: userId, // 現在のユーザーIDを設定
      start_date: formValues.startDate.toISOString(),
      end_date: formValues.endDate.toISOString(),
      description: formValues.description || null,
      genre: formValues.genre || null,
      format: formValues.format || null,
      url: formValues.url || null,
      place_id: 9999, // 一時的に固定値を設定
      mng_memb: JSON.stringify([userId]), // 運営メンバーも現在のユーザーを設定
      created_by: userId,
      act_kbn: true, // 有効フラグ
      fav_cnt: 0, // いいね数初期値
    };

    // イベントをINSERT
    const {data, error} = await supabase
      .from('EVENT_LIST_DETAIL')
      .insert(eventData)
      .select('event_id');

    if (error) {
      console.error('イベント作成エラー:', error);
      return null;
    }

    // 作成されたイベントIDを返す
    return data?.[0]?.event_id || null;
  } catch (error) {
    console.error('イベント作成中にエラーが発生しました:', error);
    return null;
  }
};

/**
 * すべてのイベントを取得する
 * @returns イベントリスト
 */
export const getAllEvents = async (): Promise<EventDetail[]> => {
  try {
    const {data, error} = await supabase
      .from('EVENT_LIST_DETAIL')
      .select('*')
      .eq('act_kbn', true) // 有効なイベントのみ
      .order('start_date', {ascending: true});

    if (error) {
      console.error('イベント取得エラー:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('イベント取得中にエラーが発生しました:', error);
    return [];
  }
};

/**
 * 特定のイベント詳細を取得する
 * @param eventId イベントID
 * @returns イベント詳細情報
 */
export const getEventById = async (
  eventId: number,
): Promise<EventDetail | null> => {
  try {
    const {data, error} = await supabase
      .from('EVENT_LIST_DETAIL')
      .select('*')
      .eq('event_id', eventId)
      .eq('act_kbn', true)
      .single();

    if (error) {
      console.error(`イベント(ID:${eventId})の取得エラー:`, error);
      return null;
    }

    return data;
  } catch (error) {
    console.error(
      `イベント(ID:${eventId})の取得中にエラーが発生しました:`,
      error,
    );
    return null;
  }
};

/**
 * イベント情報を更新する
 * @param eventId イベントID
 * @param formValues 更新するイベント情報
 * @param userId 更新を行うユーザーID
 * @returns 更新が成功したかどうか
 */
export const updateEvent = async (
  eventId: number,
  formValues: EventFormValues,
  userId: number,
): Promise<boolean> => {
  try {
    const eventData = {
      title: formValues.title,
      start_date: formValues.startDate.toISOString(),
      end_date: formValues.endDate.toISOString(),
      description: formValues.description || null,
      genre: formValues.genre || null,
      format: formValues.format || null,
      url: formValues.url || null,
      updated_at: new Date().toISOString(),
      updated_by: userId,
    };

    const {error} = await supabase
      .from('EVENT_LIST_DETAIL')
      .update(eventData)
      .eq('event_id', eventId);

    if (error) {
      console.error(`イベント(ID:${eventId})の更新エラー:`, error);
      return false;
    }

    return true;
  } catch (error) {
    console.error(
      `イベント(ID:${eventId})の更新中にエラーが発生しました:`,
      error,
    );
    return false;
  }
};
