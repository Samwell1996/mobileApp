import React from 'react';
import { View } from 'react-native';
import T from 'prop-types';
import { s } from './styles';

function Header({ children }) {
  return <View style={s.containerHeader}>{children}</View>;
}
Header.propTypes = {
  children: T.string,
};

export default Header;
