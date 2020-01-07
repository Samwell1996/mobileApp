import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';

export const s = StyleSheet.create({
  containerNoMessages: {
    flex: 1,
    backgroundColor: colors.grey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textNoMessages: {
    fontSize: 18,
    color: colors.tabColorGrey,
    marginVertical: 16,
  },
});
