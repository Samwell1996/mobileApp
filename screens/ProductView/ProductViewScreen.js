import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { observer } from 'mobx-react';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons, Entypo } from '@expo/vector-icons';
import T from 'prop-types';
import { useProductsCollection } from '../../stores/Products/ProductCollection';
import { s } from './styles';
import gStyles from '../../styles/styles';
import colors from '../../styles/colors';
import { NavigationService } from '../../services';
import notFound from '../../assets/not-found.png';

function ProductViewScreen({ navigation }) {
  const productId = navigation.getParam('productId');

  const collection = useProductsCollection();

  const product = collection.get(productId);

  let image = 'wrong';
  if (product.photos && product.photos.length) {
    image =
      product.photos[0] || product.photos[1] || product.photos[2];
  }
  return (
    <View style={s.container}>
      <LinearGradient
        colors={[colors.shadow, colors.colorNone]}
        style={s.shadow}
      >
        <TouchableOpacity
          onPress={() => NavigationService.onGoBack()}
        >
          <Ionicons name="ios-arrow-back" size={30} style={s.icon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Entypo name="share" size={30} style={s.icon} />
        </TouchableOpacity>
      </LinearGradient>
      <View style={s.containerPhotos}>
        {!!product.photos && product.photos.length > 0 ? (
          <View>
            <Image source={{ uri: image }} style={s.photos} />
            <Image
              source={notFound}
              style={[s.photosNotFound, s.absoluteNotFound]}
            />
          </View>
        ) : (
          <Image source={notFound} style={s.photosNotFound} />
        )}
        <Text style={s.title}>{product.title}</Text>
        <Text style={s.price}>${product.price}</Text>
      </View>
      <View style={s.containerLocation}>
        <MaterialIcons
          name="location-on"
          size={20}
          style={s.iconLocation}
        />
        <Text style={s.textLocation}>{product.location}</Text>
      </View>
      <View style={s.bottomContainer}>
        <Text style={s.description}>{product.description}</Text>
      </View>
    </View>
  );
}

ProductViewScreen.navigationOptions = () => ({
  header: null,
  headerStyle: gStyles.header,
});

ProductViewScreen.propTypes = {
  navigation: T.object,
};

export default observer(ProductViewScreen);
