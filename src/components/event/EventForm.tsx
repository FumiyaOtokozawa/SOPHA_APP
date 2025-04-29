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
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {format} from 'date-fns';
import {ja} from 'date-fns/locale';
import {Picker} from '@react-native-picker/picker';

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
};

// 入力フィールドの共通の高さ
const INPUT_HEIGHT = 48;

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

  // 入力値の更新関数
  const handleChange = (name: keyof EventFormValues, value: any) => {
    setValues(prev => ({...prev, [name]: value}));
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'rgb(36, 37, 41)',
  },
  formGroup: {
    marginBottom: 8,
  },
  formRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    gap: 8,
  },
  formGroupHalf: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    color: 'rgb(234, 234, 234)',
    fontWeight: '500',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 6,
    padding: 8,
    color: 'rgb(234, 234, 234)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    height: INPUT_HEIGHT,
  },
  textArea: {
    minHeight: 100,
    height: 'auto',
  },
  pickerContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    overflow: 'hidden',
    height: INPUT_HEIGHT,
    justifyContent: 'center',
  },
  picker: {
    color: 'rgb(234, 234, 234)',
    backgroundColor: 'transparent',
  },
  dateTimeContainer: {
    flexDirection: 'row',
  },
  dateTimeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    height: INPUT_HEIGHT,
  },
  dateTimeText: {
    color: 'rgb(234, 234, 234)',
    marginLeft: 8,
  },
  placeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    height: INPUT_HEIGHT,
  },
  placeText: {
    color: 'rgb(234, 234, 234)',
    marginLeft: 8,
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
    marginBottom: 40,
  },
  cancelButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 6,
    marginRight: 10,
  },
  cancelButtonText: {
    color: 'rgb(234, 234, 234)',
    fontSize: 14,
    fontWeight: '500',
  },
  submitButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'rgb(84, 98, 224)',
    borderRadius: 6,
  },
  submitButtonText: {
    color: 'rgb(234, 234, 234)',
    fontSize: 14,
    fontWeight: '500',
  },
});
