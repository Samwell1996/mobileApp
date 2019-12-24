import React from 'react';
import { View, Text } from 'react-native';
import { s } from './styles';

function EmptyScreen(props) {
  return (
    <View style={s.container}>
      <Text>{JSON.stringify(props)}</Text>
    </View>
  );
}
export default EmptyScreen;
