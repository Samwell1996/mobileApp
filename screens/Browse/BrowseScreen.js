import React from 'react';
import { Button, Text, View } from 'react-native';
import T from 'prop-types';
import { s } from './styles';
import screens from '../../navigation/screens';

function BrowseScreen({ navigation }) {
  return (
    <View style={s.container}>
      <Text>Browse Screen</Text>
      <Button
        title="Create Post Modals"
        onPress={() => navigation.navigate(screens.CreatePostModal)}
      />
    </View>
  );
}

BrowseScreen.navigationOptions = () => ({
  title: 'BrowseScreen',
});

BrowseScreen.propTypes = {
  navigation: T.object,
};

export default BrowseScreen;
