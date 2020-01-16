import React, { useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import T from 'prop-types';
import { observer } from 'mobx-react';
import { Entypo } from '@expo/vector-icons';
import HeaderUser from '../../components/Header/HeaderUser/HeaderUser';
import { useUsersCollection } from '../../stores/Users/UsersCollection';
import { useProductsCollection } from '../../stores/Products/ProductCollection';
import { useStore } from '../../stores/createStore';
import { NavigationService } from '../../services';
import screens from '../../navigation/screens';
import notFound from '../../assets/image-not-found.jpg';
import { s } from './styles';
import colors from '../../styles/colors';

function ChatScreen({ navigation }) {
  const store = useStore();
  const ownerId = navigation.getParam('ownerId');
  const chatId = navigation.getParam('chatId');
  const productId = navigation.getParam('productId');
  const usersCollection = useUsersCollection();
  const user = usersCollection.get(ownerId) || {};
  const productCollection = useProductsCollection();
  const product = productCollection.get(productId) || {};

  let productPhoto = 'wrong';
  if (product.photos && product.photos.length) {
    productPhoto =
      product.photos[0] || product.photos[1] || product.photos[2];
  }

  useEffect(() => {
    store.entities.users.fetchUserById.run(ownerId);
    store.entities.products.fetchProductById.run(productId);
    store.messages.fetchMessages.run(chatId);
  }, []);
  return (
    <View>
      <HeaderUser
        userInitials={user.initials}
        userFullName={user.fullName}
      />
      <View style={s.containerProduct}>
        <TouchableOpacity
          onPress={() =>
            NavigationService.navigate(screens.ProductView, {
              productId,
            })
          }
        >
          <View style={s.containerAvatars}>
            <View style={s.productAvatarContainer}>
              {!!product.photos && product.photos.length > 0 ? (
                <View>
                  <Image
                    source={{ uri: productPhoto }}
                    style={s.AvatarProduct}
                  />
                  <Image source={notFound} style={s.notFound} />
                </View>
              ) : (
                <Image source={notFound} style={s.AvatarProduct} />
              )}
            </View>
          </View>
          <View style={s.infoText}>
            <Text numberOfLines={1} style={s.textTitle}>
              {product.title}
            </Text>
            <Text numberOfLines={1} style={s.textDescription}>
              {product.description}
            </Text>
          </View>
          <View style={s.containerIcon}>
            <Entypo
              name="chevron-right"
              size={35}
              color={colors.borderColorGrey}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View style={s.container}>
        <Text>{chatId}</Text>
        <TextInput />
      </View>
    </View>
  );
}

ChatScreen.navigationOptions = () => ({
  header: null,
});

ChatScreen.propTypes = {
  navigation: T.object,
};

export default observer(ChatScreen);
