import React, { useEffect } from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import { observer } from 'mobx-react';
import T from 'prop-types';
import image from '../../assets/inbox.png';
import { s } from './styles';
import gStyles from '../../styles/styles';
import { useStore } from '../../stores/createStore';

function InboxScreen() {
  const store = useStore();

  useEffect(() => {
    store.chats.fetchChats.run();
  }, []);
  console.log(store.chats.items, 'chats');

  return (
    <View style={s.container}>
      {store.chats.items.length > 0 ? (
        <FlatList
          refreshing={store.chats.isLoading}
          keyExtractor={(item) => `${item.id}`}
          data={store.chats.items}
          renderItem={({ item }) => <Text>{item.id}</Text>}
        />
      ) : (
        <View style={s.containerNoMessages}>
          <Image source={image} />
          <Text style={s.textNoMessages}>No messages yet</Text>
        </View>
      )}
    </View>
  );
}

InboxScreen.navigationOptions = () => ({
  title: 'Inbox',
  headerStyle: gStyles.header,
});

InboxScreen.propTypes = {};

export default observer(InboxScreen);
