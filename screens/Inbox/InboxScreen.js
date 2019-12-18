import React from 'react';
import { Button, Text, View } from 'react-native';
import T from 'prop-types';
import { s } from './styles';
import screens from '../../navigation/screens';

function InboxScreen({ navigation }) {
  return (
    <View style={s.container}>
      <Text>Inbox Screen</Text>
      <Button
        title="Create Post Modals"
        onPress={() => navigation.navigate(screens.CreatePostModal)}
      />
    </View>
  );
}

InboxScreen.navigationOptions = () => ({
  title: 'InboxScreen',
});

InboxScreen.propTypes = {
  navigation: T.object,
};

export default InboxScreen;
