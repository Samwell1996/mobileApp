import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { observer } from 'mobx-react';
import T from 'prop-types';
import HeaderUser from '../../components/Header/HeaderUser/HeaderUser';
import { useUsersCollection } from '../../stores/Users/UsersCollection';
import ProductList from '../../components/ProductList/ProductList';
import { useViewer } from '../../stores/ViewerStore';
import { useStore } from '../../stores/createStore';
import gStyles from '../../styles/styles';
import { s } from './styles';
import { SubHeader } from '../Profile/components/';
import image from '../../assets/box.png';

function UserProductScreen({ navigation }) {
  const store = useStore();
  const ownerId = navigation.getParam('ownerId');
  const usersCollection = useUsersCollection();
  const user = usersCollection.get(ownerId) || {};
  const { initials, fullName } = user;
  const viewer = useViewer();
  const { ownProducts } = viewer.user;
  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
    store.entities.users.fetchUserById.run(ownerId);
    ownProducts.fetchOwnProducts.run(ownerId);
  }, []);

  return (
    <View style={s.containerItems}>
      {showHeader && (
        <HeaderUser userInitials={initials} userFullName={fullName} />
      )}
      <View style={s.containerProducts}>
        <ProductList
          ListHeaderComponent={() => (
            <SubHeader
              initials={initials}
              fullName={fullName}
              navigation={navigation}
            />
          )}
          onRefresh={() => ownProducts.fetchOwnProducts.run(ownerId)}
          refreshing={ownProducts.fetchOwnProducts.isLoading}
          showsVerticalScrollIndicator={false}
          onScrollEndDrag={() => setShowHeader(true)}
          store={ownProducts}
          onItemPress={() => {}}
          scrollEventThrottle={1}
          ListEmptyComponent={() => (
            <View style={s.containerContent}>
              <Image source={image} />
              <Text style={s.textNoItems}>
                User doesn’t sell anything yet
              </Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}

UserProductScreen.navigationOptions = () => ({
  header: null,
  headerStyle: gStyles.header,
});

UserProductScreen.propTypes = {
  navigation: T.object,
};

export default observer(UserProductScreen);
