import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';

export const s = StyleSheet.create({
  containerNoMessages: {
    flex: 1,
    backgroundColor: colors.grey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: colors.grey,
    width: '100%',
    height: '100%',
    paddingBottom: 100,
  },
  textNoMessages: {
    fontSize: 18,
    color: colors.tabColorGrey,
    marginVertical: 16,
  },
  line: {
    backgroundColor: colors.borderColorGrey,
    height: 1,
    top: -1,
  },
});
