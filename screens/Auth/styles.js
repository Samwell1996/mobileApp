import { StyleSheet, Platform } from 'react-native';
import colors from '../../styles/colors';

export const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grey,
    justifyContent: 'space-between',
  },
  header: {
    ...Platform.select({
      android: {
        elevation: 0,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: colors.borderColorGrey,
      },
    }),
  },
  buttonRestorePassword: {
    color: colors.primary,
    backgroundColor: colors.colorNone,
    left: 230,
    fontSize: 14,
  },
});
