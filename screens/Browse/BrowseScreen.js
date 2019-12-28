import React, { useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { observer } from 'mobx-react';
import { FontAwesome } from '@expo/vector-icons';
import T from 'prop-types';
import { useStore } from '../../stores/createStore';
import ProductList from '../../components/ProductList/ProductList';
import Header from '../../components/Header/Header';
import Search from '../../components/Header/Search/Search';
import { s } from './styles';
import gStyles from '../../styles/styles';
import colors from '../../styles/colors';

function BrowseScreen() {
  const store = useStore();
  console.log(store.latestProducts.items, 'itemLatest');
  useEffect(() => {
    store.latestProducts.fetchLatest.run();
  }, []);

  return (
    <View style={s.container}>
      <Text>Browse Screen</Text>
      <ProductList store={store.latestProducts} />
    </View>
  );
}

BrowseScreen.navigationOptions = () => ({
  headerStyle: gStyles.header,
  header: (
    <Header>
      <Search />
      <TouchableOpacity style={s.iconFilter}>
        <FontAwesome name="filter" size={25} color={colors.primary} />
      </TouchableOpacity>
    </Header>
  ),
});

BrowseScreen.propTypes = {};

export default observer(BrowseScreen);
