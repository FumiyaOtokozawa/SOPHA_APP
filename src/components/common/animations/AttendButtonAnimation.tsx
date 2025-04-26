import {useRef, useState, useEffect} from 'react';
import {Animated, Dimensions, Easing} from 'react-native';

export const useAttendButtonAnimation = (footerHeight: number) => {
  const [isAttendAnimating, setIsAttendAnimating] = useState(false);
  const [isAttendCentered, setIsAttendCentered] = useState(false);
  const attendButtonPosition = useRef(
    new Animated.ValueXY({x: 0, y: 0}),
  ).current;
  const attendButtonScale = useRef(new Animated.Value(1)).current;
  const windowHeight = Dimensions.get('window').height;

  // オーラ用アニメーション
  const auraAnim = useRef(new Animated.Value(0)).current;
  const [isAuraOn, setIsAuraOn] = useState(false);

  // オーラアニメーションのループ
  useEffect(() => {
    let loopAnim: Animated.CompositeAnimation | null = null;
    if (isAuraOn) {
      loopAnim = Animated.loop(
        Animated.sequence([
          Animated.timing(auraAnim, {
            toValue: 1,
            duration: 900,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(auraAnim, {
            toValue: 0,
            duration: 900,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true,
          }),
        ]),
      );
      loopAnim.start();
    } else {
      auraAnim.setValue(0);
    }
    return () => {
      if (loopAnim) loopAnim.stop();
    };
  }, [isAuraOn, auraAnim]);

  const animateToCenter = () => {
    if (isAttendAnimating || isAttendCentered) return;
    setIsAttendAnimating(true);
    Animated.parallel([
      Animated.timing(attendButtonPosition, {
        toValue: {
          x: 0,
          y: -(windowHeight / 2) + footerHeight + 40,
        },
        duration: 600,
        easing: Easing.inOut(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(attendButtonScale, {
        toValue: 1.3,
        duration: 600,
        easing: Easing.inOut(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsAttendAnimating(false);
      setIsAttendCentered(true);
    });
  };

  const animateToOrigin = (onFinish?: () => void) => {
    if (isAttendAnimating || !isAttendCentered) return;
    setIsAttendAnimating(true);
    Animated.parallel([
      Animated.timing(attendButtonPosition, {
        toValue: {x: 0, y: 0},
        duration: 400,
        easing: Easing.inOut(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(attendButtonScale, {
        toValue: 1,
        duration: 400,
        easing: Easing.inOut(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsAttendAnimating(false);
      setIsAttendCentered(false);
      if (onFinish) onFinish();
    });
  };

  return {
    isAttendAnimating,
    isAttendCentered,
    attendButtonPosition,
    attendButtonScale,
    animateToCenter,
    animateToOrigin,
    // オーラ用
    isAuraOn,
    setIsAuraOn,
    auraAnim,
  };
};
