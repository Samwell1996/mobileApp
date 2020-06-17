import React, { useEffect } from 'react';
import { Text, View, Image } from 'react-native';
import { observer } from 'mobx-react';
import T from 'prop-types';
import { s } from './styles';
import { useViewer } from '../../stores/ViewerStore';
import image from '../../assets/box.png';
import ProductList from '../../components/ProductList/ProductList';
import { SubHeader } from './components';
import HeaderUser from '../../components/Header/HeaderUser/HeaderUser';

function ProfileScreen({ navigation }) {
  const viewer = useViewer();
  const { ownProducts, initials, fullName } = viewer.user;
  useEffect(() => {
    ownProducts.fetchOwnProducts.run(viewer.user.id);
  }, []);

  return (
    <View style={s.container}>
      <SubHeader
        navigation={navigation}
        initials={initials}
        fullName={fullName}
      />
      {/* <HeaderUser userInitials={initials} userFullName={fullName} /> */}
      {ownProducts.items.length > 0 ? (
        <View style={s.containerProducts}>
          <ProductList
            onRefresh={() =>
              ownProducts.fetchOwnProducts.run(viewer.user.id)
            }
            refreshing={ownProducts.fetchOwnProducts.isLoading}
            store={ownProducts}
            onItemPress={() => {}}
          />
        </View>
      ) : (
        <View style={s.containerContent}>
          <Image source={image} />
          <Text style={s.textNoItems}>
            User doesn’t sell anything yet
          </Text>
        </View>
      )}
    </View>
  );
}

ProfileScreen.navigationOptions = () => ({
  header: null,
});

ProfileScreen.propTypes = {
  navigation: T.object,
};

export default observer(ProfileScreen);
