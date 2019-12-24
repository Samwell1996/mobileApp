import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';

const styles = StyleSheet.create({
  plusBottom: {
    height: 54,
  },
  plusTopBar: {
    height: 57,
  },
  plusTop: {
    height: 100,
    width: 100,
    backgroundColor: colors.isErrorColor,
    zIndex: 5,
    borderRadius: 50,
  },
  plusCenter: {
    position: 'absolute',
    height: 56,
    backgroundColor: colors.white,
    zIndex: 1,
    borderRadius: 50,
  },
  height: {
    height: 64,
    paddingTop: 0,
    paddingBottom: 7,
    backgroundColor: colors.colorNone,
  },
});

export default styles;
