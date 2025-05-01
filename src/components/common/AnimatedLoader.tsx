/**
 * AnimatedLoader.tsx
 * シンプルで洗練されたローディングアニメーションを提供するコンポーネント
 * ミニマルデザインで一貫性のある円形アニメーション
 */
import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Animated, Easing, Text} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface AnimatedLoaderProps {
  size?: 'small' | 'large';
  color?: string;
  message?: string;
  showIcon?: boolean;
  iconName?: string;
}

export const AnimatedLoader: React.FC<AnimatedLoaderProps> = ({
  size = 'large',
  color = 'rgb(84, 98, 224)',
  message,
  showIcon = true,
  iconName = 'rocket',
}) => {
  // メインのローテーションアニメーション
  const rotateAnim = useRef(new Animated.Value(0)).current;
  // 透明度アニメーション
  const opacityAnim = useRef(new Animated.Value(0.4)).current;

  // サイズ設定
  const circleSize = size === 'large' ? 60 : 36;
  const iconSize = size === 'large' ? 28 : 18;
  const thickness = size === 'large' ? 3 : 2;
  const outerSize = circleSize + 12;

  useEffect(() => {
    // スムーズなローテーションアニメーション
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();

    // 微妙な透明度の変化
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacityAnim, {
          toValue: 0.7,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0.4,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [rotateAnim, opacityAnim]);

  // ローテーションの補間
  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  // 反対方向のローテーション（アイコン用）
  const counterRotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-360deg'],
  });

  return (
    <View style={styles.container}>
      {/* 外側の円（静止） */}
      <View
        style={[
          styles.outerCircle,
          {
            width: outerSize,
            height: outerSize,
            borderRadius: outerSize / 2,
            borderWidth: thickness,
            borderColor: color,
          },
        ]}
      />

      {/* 回転する円 */}
      <Animated.View
        style={[
          styles.spinningCircle,
          {
            width: circleSize,
            height: circleSize,
            borderRadius: circleSize / 2,
            borderWidth: thickness,
            borderColor: color,
            transform: [{rotate: rotation}],
          },
        ]}>
        {/* 半円マーク（回転する円の一部） */}
        <View
          style={[
            styles.circleMarker,
            {
              width: thickness * 2,
              height: thickness * 2,
              borderRadius: thickness,
              backgroundColor: color,
              top: -thickness,
              left: circleSize / 2 - thickness,
            },
          ]}
        />
      </Animated.View>

      {/* アイコン */}
      {showIcon && (
        <Animated.View
          style={[
            styles.iconContainer,
            {
              opacity: opacityAnim,
              transform: [{rotate: counterRotation}],
            },
          ]}>
          <MaterialIcons name={iconName} size={iconSize} color={color} />
        </Animated.View>
      )}

      {/* メッセージ */}
      {message && <Text style={[styles.message, {color}]}>{message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outerCircle: {
    position: 'absolute',
    borderStyle: 'solid',
    opacity: 0.3,
  },
  spinningCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'solid',
    position: 'absolute',
  },
  circleMarker: {
    position: 'absolute',
  },
  iconContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    position: 'absolute',
    bottom: -40,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
});
