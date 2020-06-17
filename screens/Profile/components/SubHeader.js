import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { observer } from 'mobx-react';
import T from 'prop-types';
import { Ionicons } from '@expo/vector-icons';
import screens from '../../../navigation/screens';
import { s } from '../styles';
import colors from '../../../styles/colors';

function SubHeader({ navigation, initials, fullName }) {
  return (
    <View style={s.containerHeader}>
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
    </View>
  );
}

SubHeader.propTypes = {
  navigation: T.object,
  initials: T.string,
  fullName: T.string,
};

export default observer(SubHeader);
