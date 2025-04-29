/**
 * イベント作成画面
 * 新規イベントの作成機能を提供
 * EventFormコンポーネントを使用して入力フォームを表示
 */
import React from 'react';
import {StyleSheet, SafeAreaView, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {EventForm, EventFormValues} from '../components/event/EventForm';
import {CustomHeader} from '../components/common/CustomHeader';

export const CreateEventScreen: React.FC = () => {
  const navigation = useNavigation();

  // フォーム送信時の処理
  const handleSubmit = (values: EventFormValues) => {
    console.log('イベント作成：', values);
    // 実際のアプリではここでイベント作成APIを呼び出す
    // API呼び出し例: createEvent(values)

    // イベント一覧画面に戻る
    navigation.goBack();
  };

  // キャンセル時の処理
  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        title="イベント作成"
        showBackButton
        onBackPress={handleCancel}
      />
      <View style={styles.content}>
        <EventForm onSubmit={handleSubmit} onCancel={handleCancel} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(36, 37, 41)',
  },
  content: {
    flex: 1,
  },
});
