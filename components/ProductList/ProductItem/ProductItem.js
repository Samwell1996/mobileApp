import React from 'react';
import { Text, View, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { observer } from 'mobx-react';
import T from 'prop-types';
import notFound from '../../../assets/not-found.png';
import { s } from './styles';

function ProductItem({ item }) {
  let image = 'wrong';
  if (item.photos && item.photos.length) {
    image = item.photos[0] || item.photos[1] || item.photos[2];
  }
  return (
    <View style={s.containerItem}>
      {item.photos ? (
        <View>
          <Image source={{ uri: image }} style={s.image} />
          <Image
            source={notFound}
            style={[s.imageNotFound, s.imageAbsolute]}
          />
        </View>
      ) : (
        <View>
          <Image source={notFound} style={s.imageNotFound} />
        </View>
      )}
      <View style={s.containerTitle}>
        <Text style={s.textTitle}>{item.title}</Text>
      </View>
      <View style={s.containerPrice}>
        <Text style={s.textPrice}>${item.price}</Text>
      </View>
      <Ionicons name="md-bookmark" size={25} style={s.iconSave} />
    </View>
  );
}
ProductItem.propTypes = {
  item: T.object,
};

export default observer(ProductItem);
