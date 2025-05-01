/**
 * イベントフォームコンポーネント
 * イベントの作成・編集に使用する共通フォーム
 * 必要な入力項目を含み、新規作成と編集の両方で使用可能
 */
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert,
  Modal,
  Switch,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {format} from 'date-fns';
import {ja} from 'date-fns/locale';
import {Picker} from '@react-native-picker/picker';
import {styles} from '../../styles/screens/event/EventFormStyle';

// フォームの入力値の型定義
export interface EventFormValues {
  title: string;
  genre: 'official' | 'unofficial' | '';
  format: 'offline' | 'online' | 'hybrid' | '';
  startDate: Date;
  endDate: Date;
  placeId?: number;
  placeName?: string;
  description: string;
  url: string;
  isRepeating: boolean;
  repeatType: 'daily' | 'weekly' | 'monthly' | '';
  repeatEndDate: Date | null;
}

// フォームコンポーネントのProps
interface EventFormProps {
  initialValues?: Partial<EventFormValues>;
  onSubmit: (values: EventFormValues) => void;
  onCancel: () => void;
}

// デフォルト値
const defaultValues: EventFormValues = {
  title: '',
  genre: '',
  format: '',
  startDate: new Date(),
  endDate: new Date(Date.now() + 60 * 60 * 1000), // 1時間後
  description: '',
  url: '',
  isRepeating: false,
  repeatType: '',
  repeatEndDate: null,
};

export const EventForm: React.FC<EventFormProps> = ({
  initialValues,
  onSubmit,
  onCancel,
}) => {
  // フォーム値の状態
  const [values, setValues] = useState<EventFormValues>({
    ...defaultValues,
    ...initialValues,
  });

  // 日付選択モードの状態
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [activeDateField, setActiveDateField] = useState<'start' | 'end'>(
    'start',
  );

  // 繰り返し設定ダイアログの状態
  const [showRepeatDialog, setShowRepeatDialog] = useState(false);
  const [showRepeatEndDatePicker, setShowRepeatEndDatePicker] = useState(false);

  // 入力値の更新関数
  const handleChange = (name: keyof EventFormValues, value: any) => {
    setValues(prev => ({...prev, [name]: value}));
  };

  // 繰り返し設定の切り替え
  const toggleRepeating = (value: boolean) => {
    handleChange('isRepeating', value);
    if (value) {
      setShowRepeatDialog(true);
    } else {
      // 繰り返しをオフにした場合、関連する値をリセット
      handleChange('repeatType', '');
      handleChange('repeatEndDate', null);
    }
  };

  // 繰り返し設定の保存
  const handleSaveRepeatSettings = () => {
    // バリデーション：終了日は開始日より後でなければならない
    if (values.repeatEndDate && values.repeatEndDate < values.startDate) {
      Alert.alert(
        'エラー',
        '繰り返し終了日は開始日より後の日付を選択してください',
      );
      return;
    }

    setShowRepeatDialog(false);
  };

  // 繰り返し設定のキャンセル
  const handleCancelRepeatSettings = () => {
    // 繰り返し設定をキャンセルした場合、ダイアログ表示前の値に戻す
    if (!values.repeatType) {
      handleChange('isRepeating', false);
    }
    setShowRepeatDialog(false);
  };

  // 繰り返し終了日の選択
  const handleSetRepeatEndDate = (date: Date) => {
    handleChange('repeatEndDate', date);
    setShowRepeatEndDatePicker(false);
  };

  // 日付選択ダイアログ表示の切り替え
  const showDatePicker = (dateType: 'start' | 'end') => {
    setActiveDateField(dateType);
    if (dateType === 'start') {
      setShowStartDatePicker(true);
    } else {
      setShowEndDatePicker(true);
    }
  };

  // 日付選択完了時の処理
  const handleConfirmDate = (date: Date) => {
    handleChange(activeDateField === 'start' ? 'startDate' : 'endDate', date);
    if (activeDateField === 'start') {
      setShowStartDatePicker(false);
    } else {
      setShowEndDatePicker(false);
    }
  };

  // 日付選択キャンセル時の処理
  const handleCancelDate = () => {
    if (activeDateField === 'start') {
      setShowStartDatePicker(false);
    } else {
      setShowEndDatePicker(false);
    }
  };

  // 会場選択ダイアログを表示
  const handleShowPlaceDialog = () => {
    // 実際の実装では会場選択ダイアログを表示
    // 例：navigation.navigate('PlaceSelectionScreen');
    if (Platform.OS === 'ios') {
      Alert.alert('通知', '会場選択ダイアログは未実装です');
    } else {
      Alert.alert('通知', '会場選択ダイアログは未実装です');
    }
  };

  // フォーム送信ハンドラー
  const handleSubmit = () => {
    onSubmit(values);
  };

  // 日付のフォーマット
  const formatDate = (date: Date) => {
    return format(date, 'yyyy/MM/dd', {locale: ja});
  };

  // 時間のフォーマット
  const formatTime = (date: Date) => {
    return format(date, 'HH:mm', {locale: ja});
  };

  return (
    <ScrollView style={styles.container}>
      {/* タイトル */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>タイトル</Text>
        <TextInput
          style={styles.input}
          value={values.title}
          onChangeText={text => handleChange('title', text)}
          placeholder="イベントのタイトルを入力"
          placeholderTextColor="rgba(234, 234, 234, 0.5)"
        />
      </View>

      {/* ジャンルと参加フォーマット（横並び） */}
      <View style={styles.formRow}>
        {/* ジャンル */}
        <View style={styles.formGroupHalf}>
          <Text style={styles.label}>ジャンル</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={values.genre || undefined}
              onValueChange={(value: EventFormValues['genre']) =>
                handleChange('genre', value)
              }
              style={[
                styles.picker,
                !values.genre && {color: 'rgba(234, 234, 234, 0.5)'},
              ]}
              dropdownIconColor="rgba(234, 234, 234, 0.8)"
              mode="dropdown">
              <Picker.Item
                label="選択してください"
                value=""
                enabled={!!values.genre}
                color="rgba(234, 234, 234, 0.5)"
                style={{fontSize: 14}}
              />
              <Picker.Item label="公式イベント" value="official" />
              <Picker.Item label="有志イベント" value="unofficial" />
            </Picker>
          </View>
        </View>

        {/* 参加フォーマット */}
        <View style={styles.formGroupHalf}>
          <Text style={styles.label}>参加フォーマット</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={values.format || undefined}
              onValueChange={(value: EventFormValues['format']) =>
                handleChange('format', value)
              }
              style={[
                styles.picker,
                !values.format && {color: 'rgba(234, 234, 234, 0.5)'},
              ]}
              dropdownIconColor="rgba(234, 234, 234, 0.8)"
              mode="dropdown">
              <Picker.Item
                label="選択してください"
                value=""
                enabled={!!values.format}
                color="rgba(234, 234, 234, 0.5)"
                style={{fontSize: 14}}
              />
              <Picker.Item label="オフライン" value="offline" />
              <Picker.Item label="オンライン" value="online" />
              <Picker.Item label="ハイブリッド" value="hybrid" />
            </Picker>
          </View>
        </View>
      </View>

      {/* 日時選択（横並び） */}
      <View style={styles.formRow}>
        {/* 開始日時 */}
        <View style={styles.formGroupHalf}>
          <Text style={styles.label}>開始日時</Text>
          <TouchableOpacity
            style={styles.dateTimeButton}
            onPress={() => showDatePicker('start')}>
            <MaterialIcons
              name="calendar-today"
              size={16}
              color="rgba(234, 234, 234, 0.8)"
            />
            <Text style={styles.dateTimeText}>
              {formatDate(values.startDate)} {formatTime(values.startDate)}
            </Text>
          </TouchableOpacity>
        </View>

        {/* 終了日時 */}
        <View style={styles.formGroupHalf}>
          <Text style={styles.label}>終了日時</Text>
          <TouchableOpacity
            style={styles.dateTimeButton}
            onPress={() => showDatePicker('end')}>
            <MaterialIcons
              name="calendar-today"
              size={16}
              color="rgba(234, 234, 234, 0.8)"
            />
            <Text style={styles.dateTimeText}>
              {formatDate(values.endDate)} {formatTime(values.endDate)}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 繰り返し設定 */}
      <View style={[styles.formGroup]}>
        <View style={styles.switchRow}>
          <Switch
            value={values.isRepeating}
            onValueChange={toggleRepeating}
            trackColor={{
              false: 'rgba(255, 255, 255, 0.1)',
              true: 'rgba(84, 98, 224, 0.5)',
            }}
            thumbColor={
              values.isRepeating
                ? 'rgb(84, 98, 224)'
                : 'rgba(255, 255, 255, 0.5)'
            }
          />
          <Text style={styles.switchLabel}>
            {values.isRepeating ? '繰り返し有効' : '繰り返し無効'}
          </Text>
          {values.isRepeating && values.repeatType && (
            <TouchableOpacity onPress={() => setShowRepeatDialog(true)}>
              <View style={styles.repeatBadge}>
                <Text style={styles.repeatBadgeText}>
                  {values.repeatType === 'daily'
                    ? '毎日'
                    : values.repeatType === 'weekly'
                    ? '毎週'
                    : values.repeatType === 'monthly'
                    ? '毎月'
                    : ''}
                  {values.repeatEndDate
                    ? ` (${format(values.repeatEndDate, 'yyyy/MM/dd', {
                        locale: ja,
                      })}まで)`
                    : ''}
                </Text>
                <MaterialIcons
                  name="edit"
                  size={14}
                  color="rgba(234, 234, 234, 0.8)"
                />
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* 会場選択 */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>会場</Text>
        <TouchableOpacity
          style={styles.placeButton}
          onPress={handleShowPlaceDialog}>
          <MaterialIcons
            name="place"
            size={16}
            color="rgba(234, 234, 234, 0.8)"
          />
          <Text style={styles.placeText}>
            {values.placeName || '会場を選択してください'}
          </Text>
          <MaterialIcons
            name="chevron-right"
            size={18}
            color="rgba(234, 234, 234, 0.5)"
          />
        </TouchableOpacity>
      </View>

      {/* 説明 */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>説明</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={values.description}
          onChangeText={text => handleChange('description', text)}
          placeholder="イベントの説明を入力"
          placeholderTextColor="rgba(234, 234, 234, 0.5)"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
      </View>

      {/* URL */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>URL</Text>
        <TextInput
          style={styles.input}
          value={values.url}
          onChangeText={text => handleChange('url', text)}
          placeholder="関連URLを入力（任意）"
          placeholderTextColor="rgba(234, 234, 234, 0.5)"
          keyboardType="url"
        />
      </View>

      {/* ボタン */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
          <Text style={styles.cancelButtonText}>キャンセル</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>保存</Text>
        </TouchableOpacity>
      </View>

      {/* React Native Date Picker Modal for StartDate */}
      <DatePicker
        modal
        open={showStartDatePicker}
        date={values.startDate}
        onConfirm={handleConfirmDate}
        onCancel={handleCancelDate}
        title="開始日時を選択"
        confirmText="選択"
        cancelText="キャンセル"
        locale="ja"
        mode="datetime"
        theme="dark"
        minimumDate={new Date('2023-01-01')}
        maximumDate={new Date('2030-12-31')}
      />

      {/* React Native Date Picker Modal for EndDate */}
      <DatePicker
        modal
        open={showEndDatePicker}
        date={values.endDate}
        onConfirm={handleConfirmDate}
        onCancel={handleCancelDate}
        title="終了日時を選択"
        confirmText="選択"
        cancelText="キャンセル"
        locale="ja"
        mode="datetime"
        theme="dark"
        minimumDate={new Date('2023-01-01')}
        maximumDate={new Date('2030-12-31')}
      />

      {/* 繰り返し設定ダイアログ */}
      <Modal
        visible={showRepeatDialog}
        transparent
        animationType="fade"
        onRequestClose={handleCancelRepeatSettings}>
        <View style={styles.modalOverlay}>
          <View style={styles.repeatDialogContainer}>
            <View style={styles.repeatDialogHeader}>
              <Text style={styles.repeatDialogTitle}>繰り返し設定</Text>
              <TouchableOpacity onPress={handleCancelRepeatSettings}>
                <MaterialIcons
                  name="close"
                  size={24}
                  color="rgba(234, 234, 234, 0.8)"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.repeatDialogContent}>
              {/* 繰り返しタイプの選択 */}
              <View style={styles.formGroup}>
                <Text style={styles.label}>繰り返しタイプ</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={values.repeatType}
                    onValueChange={(value: EventFormValues['repeatType']) =>
                      handleChange('repeatType', value)
                    }
                    style={[
                      styles.picker,
                      !values.repeatType && {color: 'rgba(234, 234, 234, 0.5)'},
                    ]}
                    dropdownIconColor="rgba(234, 234, 234, 0.8)"
                    mode="dropdown">
                    <Picker.Item
                      label="選択してください"
                      value=""
                      enabled={!values.repeatType}
                      color="rgba(234, 234, 234, 0.5)"
                    />
                    <Picker.Item label="毎日" value="daily" />
                    <Picker.Item label="毎週" value="weekly" />
                    <Picker.Item label="毎月" value="monthly" />
                  </Picker>
                </View>
              </View>

              {/* 繰り返し終了日の選択 */}
              <View style={styles.formGroup}>
                <Text style={styles.label}>繰り返し終了日</Text>
                <TouchableOpacity
                  style={styles.dateTimeButton}
                  onPress={() => setShowRepeatEndDatePicker(true)}>
                  <MaterialIcons
                    name="calendar-today"
                    size={16}
                    color="rgba(234, 234, 234, 0.8)"
                  />
                  <Text style={styles.dateTimeText}>
                    {values.repeatEndDate
                      ? format(values.repeatEndDate, 'yyyy/MM/dd', {locale: ja})
                      : '設定なし（無期限）'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.repeatDialogButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleCancelRepeatSettings}>
                <Text style={styles.cancelButtonText}>キャンセル</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.submitButton,
                  !values.repeatType && styles.disabledButton,
                ]}
                onPress={handleSaveRepeatSettings}
                disabled={!values.repeatType}>
                <Text style={styles.submitButtonText}>保存</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* 繰り返し終了日選択用DatePicker */}
      <DatePicker
        modal
        open={showRepeatEndDatePicker}
        date={
          values.repeatEndDate ||
          new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        } // デフォルトで30日後
        onConfirm={handleSetRepeatEndDate}
        onCancel={() => setShowRepeatEndDatePicker(false)}
        title="繰り返し終了日を選択"
        confirmText="選択"
        cancelText="キャンセル"
        locale="ja"
        mode="date"
        theme="dark"
        minimumDate={new Date()}
        maximumDate={new Date('2030-12-31')}
      />
    </ScrollView>
  );
};
