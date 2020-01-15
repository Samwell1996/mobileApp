import React, { useEffect } from 'react';
import { View, Text, TextInput } from 'react-native';
import T from 'prop-types';
import { observer } from 'mobx-react';
import { useUsersCollection } from '../../stores/Users/UsersCollection';
import { useStore } from '../../stores/createStore';
import { s } from './styles';
import gStyles from '../../styles/styles';
import HeaderUser from '../../components/Header/HeaderUser/HeaderUser';

function ChatScreen({ navigation }) {
  const store = useStore();
  const ownerId = navigation.getParam('ownerId');
  const usersCollection = useUsersCollection();
  const user = usersCollection.get(ownerId) || {};

  useEffect(() => {
    store.entities.users.fetchUserById.run(ownerId);
  }, []);

  return (
    <View>
      <HeaderUser
        userInitials={user.initials}
        userFullName={user.fullName}
      />
      <View style={s.container}>
        <Text>Chat</Text>
        <TextInput />
      </View>
    </View>
  );
}

ChatScreen.navigationOptions = () => ({
  header: null,
  headerStyle: gStyles.header,
});

ChatScreen.propTypes = {
  navigation: T.object,
};

export default observer(ChatScreen);
