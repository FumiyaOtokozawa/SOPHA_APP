/**
 * ユーザーの保有ポイントを表示するカードコンポーネント
 * 総保有ポイント、過去1ヶ月の増減を表示する
 * ホーム画面の上部に配置され、ポイント状況の概要を示す
 */

import React, {useEffect, useRef, useState} from 'react';
import {View, Text, Animated, Easing} from 'react-native';
import {homeStyles} from '../../styles/screens/home/homeStyles';
import {useTheme} from 'react-native-paper';
import type {AppTheme} from '../../theme';

interface PointsCardProps {
  totalPoints: number;
  lastMonthChange: number;
}

export const PointsCard: React.FC<PointsCardProps> = ({
  totalPoints,
  lastMonthChange,
}) => {
  const theme = useTheme<AppTheme>();
  const [displayedTotalPoints, setDisplayedTotalPoints] = useState(0);
  const [displayedLastMonthChange, setDisplayedLastMonthChange] = useState(0);
  const animationValue = useRef(new Animated.Value(0)).current;
  const animationDuration = 1500; // アニメーション時間（ミリ秒）

  // 初期表示時にアニメーションを開始
  useEffect(() => {
    Animated.timing(animationValue, {
      toValue: 1,
      duration: animationDuration,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();

    // アニメーション中の値を更新するリスナーを設定
    const listener = animationValue.addListener(({value}) => {
      setDisplayedTotalPoints(Math.floor(value * totalPoints));
      setDisplayedLastMonthChange(Math.floor(value * lastMonthChange));
    });

    // クリーンアップ関数
    return () => {
      animationValue.removeListener(listener);
    };
  }, [animationValue, totalPoints, lastMonthChange]);

  // ポイントを3桁ずつカンマ区切りにフォーマット
  const formattedTotalPoints = displayedTotalPoints.toLocaleString();
  const formattedLastMonthChange = Math.abs(
    displayedLastMonthChange,
  ).toLocaleString();

  return (
    <View style={homeStyles.points__container}>
      <View style={homeStyles.points__card}>
        {/* <Text style={homeStyles.points__title}>所持ポイント</Text> */}
        <View style={homeStyles.points__valueContainer}>
          <Text style={homeStyles.points__value}>{formattedTotalPoints}</Text>
          <Text style={homeStyles.points__unit}>CIZ</Text>
        </View>
        <View style={homeStyles.points__monthlyChange}>
          <Text style={homeStyles.points__monthlyLabel}>過去1ヶ月の増減:</Text>
          <Text
            style={[
              homeStyles.points__monthlyValue,
              {
                color:
                  lastMonthChange >= 0
                    ? theme.colors.success
                    : theme.colors.error,
              },
            ]}>
            {lastMonthChange >= 0 ? '+' : '-'}
            {formattedLastMonthChange} CIZ
          </Text>
        </View>
      </View>
    </View>
  );
};
