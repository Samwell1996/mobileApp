import React from 'react';
import { View } from 'react-native';
import Navigator from './navigation/Index';
import globalStyles from './styles/styles';

export default function App() {
  return (
    <View style={[globalStyles.fillAll]}>
      <Navigator />
    </View>
  );
}
