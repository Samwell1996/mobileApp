import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import T from 'prop-types';
import image from '../../assets/inbox.png';
import { s } from './styles';
import gStyles from '../../styles/styles';
import { NavigationService } from '../../services';

function InboxScreen() {
  return (
    <View style={s.containerNoMessages}>
      <Image source={image} />
      <Text style={s.textNoMessages}>No messages yet</Text>
      <TouchableOpacity
        onPress={() => NavigationService.navigateToCreatePost()}
      >
        <Text>12321</Text>
      </TouchableOpacity>
    </View>
  );
}

InboxScreen.navigationOptions = () => ({
  title: 'Inbox',
  headerStyle: gStyles.header,
});

InboxScreen.propTypes = {};

export default InboxScreen;
