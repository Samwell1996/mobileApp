import React from 'react';
import { Button, Text, View } from 'react-native';
import T from 'prop-types';
import { s } from './styles';
import screens from '../../navigation/screens';

function ProfileScreen({ navigation }) {
  return (
    <View style={s.container}>
      <Text>Profile Screen</Text>
      <Button
        title="Settings"
        onPress={() => navigation.navigate(screens.Setting)}
      />
    </View>
  );
}

ProfileScreen.navigationOptions = () => ({
  title: 'ProfileScreen',
});

ProfileScreen.propTypes = {
  navigation: T.object,
};

export default ProfileScreen;
