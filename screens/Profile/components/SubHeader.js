import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  Dimensions,
  StyleSheet,
} from 'react-native';
import Animated from 'react-native-reanimated';
import { observer } from 'mobx-react';
import T from 'prop-types';
import { Ionicons } from '@expo/vector-icons';
import screens from '../../../navigation/screens';
import { s } from '../styles';
import colors from '../../../styles/colors';
import { statusBarHeight } from '../../../styles/dimensions';

const { height } = Dimensions.get('window');
const { interpolate, Extrapolate } = Animated;

const z = (1 + Math.sqrt(5)) / 2;
const MIN_HEIGHT = 64 + statusBarHeight;
const MAX_HEIGHT = height * (1 - 1 / z);
const HEADER_DELTA = MAX_HEIGHT - MIN_HEIGHT;

function SubHeader({
  navigation,
  initials,
  fullName,
  y,
  isVisibleSettings = true,
}) {
  const scale: any = interpolate(y, {
    inputRange: [-MAX_HEIGHT, 0],
    outputRange: [4, 1],
    extrapolateRight: Extrapolate.CLAMP,
  });

  const opacity = interpolate(y, {
    inputRange: [-64, 0, HEADER_DELTA],
    outputRange: [0, 0.2, 1],
    extrapolate: Extrapolate.CLAMP,
  });

  return (
    <Animated.View
      style={[s.containerHeader, { transform: [{ scale }] }]}
    >
      <View style={s.containerAvatar}>
        <Text style={s.textAvatar}>{initials}</Text>
      </View>
      <Text style={s.textFullName}>{fullName}</Text>
      <View style={s.containerTextInfo}>
        <Text style={s.textInfoFirst}>active: </Text>
        <Text style={s.textInfoSecond}>145</Text>
        <View style={s.lineVertical} />
        <Text style={s.textInfoFirst}>sold: </Text>
        <Text style={s.textInfoSecond}>30</Text>
        <View style={s.lineVertical} />
        <Text style={s.textInfoFirst}>rating: </Text>
        <Text style={s.textInfoSecond}>4.7</Text>
      </View>

      {isVisibleSettings && (
        <TouchableOpacity
          style={s.openSetting}
          onPress={() => navigation.navigate(screens.Setting)}
        >
          <Ionicons
            name="md-settings"
            size={30}
            color={colors.tabColorGrey}
          />
        </TouchableOpacity>
      )}
      <Animated.View
        style={{ ...StyleSheet.absoluteFillObject, opacity }}
      />
    </Animated.View>
  );
}

SubHeader.propTypes = {
  navigation: T.object,
  initials: T.string,
  fullName: T.string,
};

export default observer(SubHeader);
