import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';

export const s = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: colors.grey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerProducts: {
    height: '85%',
    width: '100%',
  },
  containerItems: {
    height: '100%',
    backgroundColor: colors.grey,
  },
  containerContent: {
    flex: 1,
    backgroundColor: colors.grey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textNoItems: {
    fontSize: 18,
    color: colors.tabColorGrey,
    marginVertical: 16,
  },
});
