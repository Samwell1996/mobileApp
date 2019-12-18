import React from 'react';
import { Button, Text, View } from 'react-native';
import T from 'prop-types';
import { s } from './styles';
import screens from '../../navigation/screens';

function SavedScreen({ navigation }) {
  return (
    <View style={s.container}>
      <Text>Saved Screen</Text>
      <Button
        title="Create Post Modals"
        onPress={() => navigation.navigate(screens.CreatePostModal)}
      />
    </View>
  );
}

SavedScreen.navigationOptions = () => ({
  title: 'SavedScreen',
});

SavedScreen.propTypes = {
  navigation: T.object,
};

export default SavedScreen;
