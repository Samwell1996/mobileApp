import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { observer } from 'mobx-react';
import T from 'prop-types';

function Item({ item }) {
  return (
    <View>
      <Text>{item.title}</Text>
      {console.log(item)}
    </View>
  );
}

function ProductList({ style, store, ...props }) {
  return (
    <FlatList
      renderItem={({ item }) => <Item item={item} />}
      data={store.items.asArray}
    />
  );
}
ProductList.propTypes = {
  style: T.object,
  store: T.object,
};

export default observer(ProductList);
