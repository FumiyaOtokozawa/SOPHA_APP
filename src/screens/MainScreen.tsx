import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/AppNavigator';

type MainScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Main'>;
};

export const MainScreen = ({navigation: _navigation}: MainScreenProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>メイン画面</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
