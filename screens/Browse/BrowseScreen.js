import React, { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
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
import ListFooter from '../../components/ProductList/ListFooter/ListFooter';

function BrowseScreen({ navigation }) {
  const store = useStore();
  useEffect(() => {
    store.latestProducts.fetchLatest.run();
  }, []);

  return (
    <ProductList
      store={store.latestProducts}
      onRefresh={() => store.latestProducts.fetchLatest.run()}
      refreshing={store.latestProducts.fetchLatest.isLoading}
      ListFooterComponent={() => (
        <ListFooter fetch={store.latestProducts.fetchMore} />
      )}
      onEndReached={() => store.latestProducts.fetchMore.run()}
      onEndReachedThreshold={0.3}
    />
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

BrowseScreen.propTypes = {
  navigation: T.object,
};

export default observer(BrowseScreen);
