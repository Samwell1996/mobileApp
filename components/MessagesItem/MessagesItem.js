import React from 'react';
import { Text, View } from 'react-native';
import { observer } from 'mobx-react';
import T from 'prop-types';
import { s } from './styles';

function MessagesItem({ item, userId, ownerId }) {
  const isOwner = userId === ownerId;
  return (
    <View style={!isOwner ? s.ownerContainer : s.userContainer}>
      <View style={!isOwner ? s.owner : s.user}>
        <Text style={!isOwner ? s.ownerText : s.userText}>
          {item.text}
        </Text>
        <Text style={!isOwner ? s.ownerDate : s.userDate}>
          {item.date()}
        </Text>
      </View>
    </View>
  );
}
MessagesItem.propTypes = {
  item: T.object,
  userId: T.number,
  ownerId: T.number,
};

export default observer(MessagesItem);
