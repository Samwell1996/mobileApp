import React, { useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { observer } from 'mobx-react';
import T from 'prop-types';
import { Ionicons } from '@expo/vector-icons';
import NavigationService from '../../services/NavigationServices';
import { useUsersCollection } from '../../stores/Users/UsersCollection';
import Header from '../../components/Header/Header';
import LoadingComponent from '../../components/ProductView/LoadingComponent/LoadingComponent';
import ProductList from '../../components/ProductList/ProductList';
import { useViewer } from '../../stores/ViewerStore';
import { useStore } from '../../stores/createStore';
import gStyles from '../../styles/styles';
import { s } from './styles';

function UserProductScreen({ navigation }) {
  const store = useStore();
  const ownerId = navigation.getParam('ownerId');
  const usersCollection = useUsersCollection();
  const user = usersCollection.get(ownerId) || {};
  const viewer = useViewer();
  const ownProducts = viewer.user.ownProducts;

  useEffect(() => {
    store.entities.users.fetchUserById.run(ownerId);
    ownProducts.fetchOwnProducts.run(ownerId);
  }, []);

  return (
    <View>
      <Header>
        <View style={s.containerHeader}>
          <TouchableOpacity
            onPress={() => NavigationService.onGoBack()}
          >
            <Ionicons
              name="ios-arrow-back"
              size={30}
              style={s.icon}
            />
          </TouchableOpacity>
          <View style={s.containerUserInfo}>
            <View style={s.loading}>
              <LoadingComponent
                fetch={store.entities.users.fetchUserById.isLoading}
              />
            </View>
            <View style={s.avatar}>
              <Text style={s.avatarText}>{user.initials}</Text>
            </View>
            <Text style={s.fullNameText}>{user.fullName}</Text>
          </View>
        </View>
      </Header>
      <View style={s.containerProducts}>
        <ProductList
          onRefresh={() => ownProducts.fetchOwnProducts.run(ownerId)}
          refreshing={ownProducts.fetchOwnProducts.isLoading}
          store={ownProducts}
          onItemPress={() => {}}
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
