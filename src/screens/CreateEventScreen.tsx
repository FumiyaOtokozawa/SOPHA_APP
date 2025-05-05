/**
 * イベント作成画面
 * 新規イベントの作成機能を提供
 * EventFormコンポーネントを使用して入力フォームを表示
 */
import React, {useState} from 'react';
import {StyleSheet, SafeAreaView, View, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {EventForm, EventFormValues} from '../components/event/EventForm';
import {CustomHeader} from '../components/common/CustomHeader';
import {createEvent} from '../services/eventService';
import {useAuth} from '../contexts/AuthContext';
import {LoadingOverlay} from '../components/common/LoadingOverlay';

export const CreateEventScreen: React.FC = () => {
  const navigation = useNavigation();
  const {userInfo} = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // フォーム送信時の処理
  const handleSubmit = async (values: EventFormValues) => {
    if (!userInfo || !userInfo.emp_no) {
      Alert.alert(
        'エラー',
        'ユーザー情報が取得できません。再ログインしてください。',
      );
      return;
    }

    setIsLoading(true);

    try {
      // イベント作成処理を実行
      const eventId = await createEvent(values, userInfo.emp_no);

      if (eventId) {
        // 成功時
        Alert.alert('成功', 'イベントを作成しました', [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]);
      } else {
        // 失敗時
        Alert.alert(
          'エラー',
          'イベントの作成に失敗しました。もう一度お試しください。',
        );
      }
    } catch (error) {
      console.error('イベント作成エラー:', error);
      Alert.alert('エラー', 'イベントの作成中にエラーが発生しました。');
    } finally {
      setIsLoading(false);
    }
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

      {/* ローディングオーバーレイ */}
      {isLoading && <LoadingOverlay message="イベント作成中..." />}
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
