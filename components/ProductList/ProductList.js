import React from 'react';
import { FlatList } from 'react-native';
import { observer } from 'mobx-react';
import T from 'prop-types';
import ProductItem from './ProductItem/ProductItem';
import ListFooter from './ListFooter/ListFooter';
import { s } from './styles';

function ProductList({ style, store, ...props }) {
  return (
    <FlatList
      contentContainerStyle={s.list}
      numColumns={2}
      renderItem={({ item }) => (
        <ProductItem item={item} rootProps={props} />
      )}
      data={store.items}
      keyExtractor={(item) => item.id}
      onRefresh={() => store.fetchLatest.run()}
      refreshing={store.fetchLatest.isLoading}
      ListFooterComponent={() => (
        <ListFooter fetch={store.fetchMore} />
      )}
      onEndReached={() => store.fetchMore.run()}
      onEndReachedThreshold={0.3}
    />
  );
}
ProductList.propTypes = {
  style: T.object,
  store: T.object,
};

export default observer(ProductList);
