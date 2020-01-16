import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';

export const s = StyleSheet.create({
  containerProduct: {
    height: 58,
    borderBottomWidth: 1,
    backgroundColor: colors.white,
    borderBottomColor: colors.borderColorGrey,
  },
  containerAvatars: {
    position: 'absolute',
    marginVertical: 13,
    marginHorizontal: 8,
  },
  productAvatarContainer: {
    height: 32,
    width: 32,
    borderRadius: 50,
  },
  notFound: {
    position: 'absolute',
    zIndex: 3,
    height: 32,
    width: 32,
    borderRadius: 50,
  },
  AvatarProduct: {
    zIndex: 5,
    height: 32,
    width: 32,
    borderRadius: 50,
  },
  container: {
    height: '79%',
    width: '100%',
    backgroundColor: colors.grey,
    flexDirection: 'column-reverse',
  },
  infoText: {
    marginRight: 75,
    marginVertical: 8,
    marginLeft: 48,
  },
  textTitle: {
    fontSize: 14,
    color: colors.textColors,
  },
  textDescription: {
    fontSize: 14,
    color: colors.tabColorGrey,
  },
  containerIcon: {
    position: 'absolute',
    right: 0,
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  textNoMessages: {
    fontSize: 18,
    color: colors.tabColorGrey,
    marginVertical: 16,
  },
  containerNoMessages: {
    flex: 1,
    backgroundColor: colors.grey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    marginTop: 4,
    marginBottom: 9,
  },
});
