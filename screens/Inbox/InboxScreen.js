import React from 'react';
import { Image, Text, View } from 'react-native';
import T from 'prop-types';
import image from '../../assets/inbox.png';
import { s } from './styles';
import gStyles from '../../styles/styles';

function InboxScreen() {
  return (
    <View style={s.containerNoMessages}>
      <Image source={image} />
      <Text style={s.textNoMessages}>No messages yet</Text>
    </View>
  );
}

InboxScreen.navigationOptions = () => ({
  title: 'Inbox',
  headerStyle: gStyles.header,
});

InboxScreen.propTypes = {};

export default InboxScreen;
