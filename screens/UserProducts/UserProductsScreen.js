import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { observer } from 'mobx-react';
import T from 'prop-types';
import Animated from 'react-native-reanimated';
import HeaderUser from '../../components/Header/HeaderUser/HeaderUser';
import { useUsersCollection } from '../../stores/Users/UsersCollection';
import ProductList from '../../components/ProductList/ProductList';
import { useViewer } from '../../stores/ViewerStore';
import { useStore } from '../../stores/createStore';
import gStyles from '../../styles/styles';
import { s } from './styles';
import { SubHeader } from '../Profile/components/';
import image from '../../assets/box.png';

const { Value, interpolate, Extrapolate } = Animated;

function UserProductScreen({ navigation }) {
  const store = useStore();
  const ownerId = navigation.getParam('ownerId');
  const usersCollection = useUsersCollection();
  const user = usersCollection.get(ownerId) || {};
  const { initials, fullName } = user;
  const viewer = useViewer();
  const { ownProducts } = viewer.user;
  const [isShowHeaderSmall, setIsShowHeaderSmall] = useState(false);
  const [number, setNumber] = useState();

  useEffect(() => {
    store.entities.users.fetchUserById.run(ownerId);
    ownProducts.fetchOwnProducts.run(ownerId);
  }, []);

  const y = new Value(0);
  const heightHeader = interpolate(y, {
    inputRange: [-178, 0],
    outputRange: [0, 178],
    extrapolate: Extrapolate.CLAMP,
  });

  // eslint-disable-next-line consistent-return
  function transition(eventY) {
    if (eventY < 100) {
      return 0;
    } else if (eventY < 178) {
      return 0.5;
    } else if (eventY > 178) {
      return 1;
    }
  }

  function onScroll(event) {
    const eventY = event.nativeEvent.contentOffset.y;
    setNumber(transition(eventY));
    if (eventY > 178) {
      setIsShowHeaderSmall(true);
    } else {
      setIsShowHeaderSmall(false);
    }
  }

  return (
    <View style={s.containerItems}>
      <Animated.View
        style={[
          { opacity: number },
          !isShowHeaderSmall && {
            heightHeader,
            ...StyleSheet.absoluteFillObject,
          },
        ]}
      >
        <HeaderUser
          userInitials={initials}
          userFullName={fullName}
          y={y}
        />
      </Animated.View>

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={1}
        onScroll={(event) => onScroll(event)}
      >
        <SubHeader
          initials={initials}
          fullName={fullName}
          navigation={navigation}
          y={y}
          isVisibleSettings={false}
        />
        <View style={s.containerProducts}>
          <ProductList
            onRefresh={() =>
              ownProducts.fetchOwnProducts.run(ownerId)
            }
            refreshing={ownProducts.fetchOwnProducts.isLoading}
            showsVerticalScrollIndicator={false}
            store={ownProducts}
            onItemPress={() => {}}
            scrollEnabled={false}
            ListEmptyComponent={() => (
              <View style={s.containerContent}>
                <Image source={image} />
                <Text style={s.textNoItems}>
                  User doesn’t sell anything yet
                </Text>
              </View>
            )}
          />
        </View>
      </Animated.ScrollView>
    </View>
  );
}

UserProductScreen.navigationOptions = () => ({
  header: null,
  headerStyle: gStyles.header,
});

UserProductScreen.propTypes = {
  navigation: T.object,
};

export default observer(UserProductScreen);
