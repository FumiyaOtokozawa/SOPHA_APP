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
  // 結合テーブルからの情報
  owner_myoji?: string;
  owner_namae?: string;
  place_nm?: string;
  address?: string;
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
    // まず基本的なイベント情報を取得
    const {data: eventData, error: eventError} = await supabase
      .from('EVENT_LIST_DETAIL')
      .select('*')
      .eq('event_id', eventId)
      .eq('act_kbn', true)
      .single();

    if (eventError) {
      console.error(`イベント(ID:${eventId})の取得エラー:`, eventError);
      return null;
    }

    if (!eventData) {
      return null;
    }

    // 主催者情報を取得
    let ownerInfo = null;
    if (eventData.owner) {
      const {data: userData, error: userError} = await supabase
        .from('USER_INFO')
        .select('myoji, namae')
        .eq('emp_no', eventData.owner)
        .eq('act_kbn', true)
        .single();

      if (!userError && userData) {
        ownerInfo = userData;
      }
    }

    // 会場情報を取得
    let placeInfo = null;
    if (eventData.place_id) {
      const {data: placeData, error: placeError} = await supabase
        .from('EVENT_PLACE_DETAIL')
        .select('place_nm, address')
        .eq('place_id', eventData.place_id)
        .eq('act_kbn', true)
        .single();

      if (!placeError && placeData) {
        placeInfo = placeData;
      }
    }

    // 結合したデータを平坦化
    const eventDetail: EventDetail = {
      ...eventData,
      owner_myoji: ownerInfo?.myoji || null,
      owner_namae: ownerInfo?.namae || null,
      place_nm: placeInfo?.place_nm || null,
      address: placeInfo?.address || null,
    };

    return eventDetail;
  } catch (error) {
    console.error(
      `イベント(ID:${eventId})の取得中にエラーが発生しました:`,
      error,
    );
    return null;
  }
};

/**
 * 運営メンバー情報を取得する
 * @param memberIds 運営メンバーIDの配列
 * @returns 運営メンバー情報の配列
 */
export const getMemberNames = async (
  memberIds: number[],
): Promise<Array<{id: number; myoji: string; namae: string}>> => {
  try {
    if (!memberIds || memberIds.length === 0) {
      return [];
    }

    const {data, error} = await supabase
      .from('USER_INFO')
      .select('emp_no, myoji, namae')
      .in('emp_no', memberIds)
      .eq('act_kbn', true);

    if (error) {
      console.error('運営メンバー情報取得エラー:', error);
      return [];
    }

    return data.map(user => ({
      id: user.emp_no,
      myoji: user.myoji || '',
      namae: user.namae || '',
    }));
  } catch (error) {
    console.error('運営メンバー情報取得中にエラーが発生しました:', error);
    return [];
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
