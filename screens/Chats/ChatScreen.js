import React, { useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import T from 'prop-types';
import { observer } from 'mobx-react';
import { Entypo } from '@expo/vector-icons';
import HeaderUser from '../../components/Header/HeaderUser/HeaderUser';
import { useUsersCollection } from '../../stores/Users/UsersCollection';
import { useProductsCollection } from '../../stores/Products/ProductCollection';
import { useStore } from '../../stores/createStore';
import { NavigationService } from '../../services';
import MessagesItem from '../../components/MessagesItem/MessagesItem';
import screens from '../../navigation/screens';
import image from '../../assets/inbox.png';
import notFound from '../../assets/image-not-found.jpg';
import { s } from './styles';
import colors from '../../styles/colors';

function ChatScreen({ navigation, ...props }) {
  const store = useStore();
  const productCollection = useProductsCollection();
  const usersCollection = useUsersCollection();
  const ownerId = navigation.getParam('ownerId');
  const chatId = navigation.getParam('chatId');
  const productId = navigation.getParam('productId');
  const userId = navigation.getParam('userId');
  const product = productCollection.get(productId) || {};
  const owner = usersCollection.get(ownerId) || {};
  const user = usersCollection.get(userId) || {};

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
        userInitials={owner.initials}
        userFullName={owner.fullName}
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
        {store.messages.items.length > 0 ? (
          <View>
            <FlatList
              contentContainerStyle={s.list}
              refreshing={store.messages.fetchMessages.isLoading}
              keyExtractor={(item) => `${item.id}`}
              data={store.messages.items.slice()}
              inverted
              renderItem={({ item }) => (
                <MessagesItem
                  item={item}
                  rootProps={props}
                  userId={user.id}
                />
              )}
              {...props}
            />
          </View>
        ) : (
          <View style={s.containerNoMessages}>
            <Image source={image} />
            <Text style={s.textNoMessages}>No messages yet</Text>
          </View>
        )}
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
