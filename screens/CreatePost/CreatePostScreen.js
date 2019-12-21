import React from 'react';
import { Text, View } from 'react-native';
import { s } from './styles';

function CreatePostScreen() {
  return (
    <View style={s.container}>
      <Text>CreatePost Screen</Text>
    </View>
  );
}

CreatePostScreen.navigationOptions = () => ({
  title: 'CreatePostScreen',
});

CreatePostScreen.propTypes = {};

export default CreatePostScreen;
