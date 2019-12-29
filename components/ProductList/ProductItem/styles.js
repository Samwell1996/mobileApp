import { StyleSheet } from 'react-native';
import colors from '../../../styles/colors';

export const s = StyleSheet.create({
  containerItem: {
    flex: 1,
    marginTop: 8,
    marginHorizontal: 4,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.borderColorGrey,
    borderRadius: 8,
  },
  image: {
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    height: 148,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    zIndex: 2,
  },
  imageNotFound: {
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    height: 148,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginLeft: 10,
    width: 148,
    zIndex: 1,
  },
  containerTitle: {
    paddingTop: 8,
    paddingHorizontal: 12,
  },
  textTitle: {
    fontSize: 14,
  },
  textPrice: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  containerPrice: {
    paddingTop: 8,
    paddingBottom: 12,
    paddingHorizontal: 12,
  },
  iconSave: {
    position: 'absolute',
    color: colors.tabColorGrey,
    right: 14,
    bottom: 12,
  },
  imageAbsolute: {
    position: 'absolute',
  },
});
