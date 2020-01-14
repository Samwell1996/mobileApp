import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import T from 'prop-types';
import Header from '../../components/Header/Header';
import Search from '../../components/Header/Search/Search';
import { useStore } from '../../stores/createStore';
import ProductList from '../../components/ProductList/ProductList';

function SavedScreen() {
  const store = useStore();
  useEffect(() => {
    store.savedProducts.fetchSaved.run();
  }, []);
  return (
    <ProductList
      onRefresh={() => store.savedProducts.fetchSaved.run()}
      refreshing={store.savedProducts.fetchSaved.isLoading}
      store={store.savedProducts}
      onItemPress={() => {}}
    />
  );
}

SavedScreen.navigationOptions = () => ({
  header: (
    <Header>
      <Search />
    </Header>
  ),
});

SavedScreen.propTypes = {};

export default observer(SavedScreen);
