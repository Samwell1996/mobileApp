import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';

const styles = StyleSheet.create({
  plusCircle: {
    zIndex: 15,
    color: colors.primary,
    marginBottom: 3,
    top: -1,
  },
  plusVisibleCircle: {
    backgroundColor: colors.colorNone,
    position: 'absolute',
    width: 72,
    height: 72,
    zIndex: 12,
    borderRadius: 50,
    left: -8,
    top: -9,
    overflow: 'hidden',
  },
  plusBottom: {
    marginTop: 37,
    height: 23,
    backgroundColor: colors.white,
    zIndex: 1,
  },
  plusCenter: {
    height: 55,
    width: 56,
    backgroundColor: colors.white,
    zIndex: 14,
    borderRadius: 50,
  },
  plusAbsolute: {
    position: 'absolute',
  },
  height: {
    borderTopWidth: 0,
    borderTopColor: colors.colorNone,
    height: 98,
    paddingTop: 0,
    paddingBottom: 7,
    backgroundColor: colors.colorNone,
    borderWidth: 0,
    marginBottom: -7,
    position: 'absolute',
    zIndex: 10,
    elevation: 0,
    bottom: 0,
  },
  componentTab: {
    elevation: 0,
    backgroundColor: colors.white,
    height: 40,
    width: 50,
    zIndex: 11,
    position: 'absolute',
  },
  tabScreens: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.white,
    position: 'absolute',
    alignItems: 'center',
  },
  iconTab: {
    marginTop: 5,
  },
  square: {
    position: 'absolute',
    backgroundColor: colors.white,
    zIndex: 1,
    bottom: -14,
    left: -17,
    height: 40,
    width: 90,
  },
});

export default styles;
