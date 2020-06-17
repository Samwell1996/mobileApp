import React, { useEffect } from 'react';
import { View } from 'react-native';
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

function UserProductScreen({ navigation }) {
  const store = useStore();
  const ownerId = navigation.getParam('ownerId');
  const usersCollection = useUsersCollection();
  const user = usersCollection.get(ownerId) || {};
  const { initials, fullName } = user;
  const viewer = useViewer();
  const { ownProducts } = viewer.user;

  useEffect(() => {
    store.entities.users.fetchUserById.run(ownerId);
    ownProducts.fetchOwnProducts.run(ownerId);
  }, []);

  return (
    <View style={s.containerItems}>
      <HeaderUser userInitials={initials} userFullName={fullName} />
      <SubHeader
        initials={initials}
        fullName={fullName}
        navigation={navigation}
      />
      <View style={s.containerProducts}>
        <ProductList
          onRefresh={() => ownProducts.fetchOwnProducts.run(ownerId)}
          refreshing={ownProducts.fetchOwnProducts.isLoading}
          showsVerticalScrollIndicator={false}
          store={ownProducts}
          onItemPress={() => {}}
          scrollEventThrottle={1}
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
