import { Platform, StyleSheet } from 'react-native';
import colors from '../../styles/colors';

export const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grey,
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
  textModal: {
    color: colors.primary,
    fontSize: 18,
  },
  textHeader: {
    color: colors.primary,
    fontSize: 20,
    marginRight: 16,
  },
  iconPlus: {
    color: colors.tabColorGrey,
    padding: 8,
  },
  icon: {
    color: colors.primary,
    marginLeft: 16,
  },
  textInfo: {
    textTransform: 'uppercase',
    fontSize: 16,
    marginTop: 16,
    marginHorizontal: 16,
    fontWeight: '500',
    marginBottom: 9,
  },
  text: {
    textTransform: 'uppercase',
    fontSize: 16,
    marginTop: 24,
    marginLeft: 16,
    fontWeight: '500',
    marginBottom: 9,
  },
  inputTitle: {
    backgroundColor: colors.white,
    fontSize: 18,
    borderRadius: 4,
    marginHorizontal: 16,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors.borderColorGrey,
  },
  InputDesc: {
    fontSize: 18,
    backgroundColor: colors.white,
    borderRadius: 4,
    marginHorizontal: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.borderColorGrey,
    paddingVertical: 56,
  },
  containerPhotos: {
    height: 76,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.borderColorGrey,
  },
  photosButton: {
    width: 44,
    height: 44,
    backgroundColor: colors.greyPhotos,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.borderColorGrey,
    margin: 16,
  },
  containerPriceButton: {
    backgroundColor: colors.white,
    borderColor: colors.borderColorGrey,
    borderWidth: 1,
  },
  containerButton: {
    flexDirection: 'row',
  },
  priceButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16,
    marginTop: 16,
    height: 37,
    borderColor: colors.borderColorGrey,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  freeButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    marginTop: 16,
    height: 37,
    borderColor: colors.borderColorGrey,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
  textPrice: {
    color: colors.primary,
    fontSize: 18,
  },
  ButtonFocus: {
    backgroundColor: colors.primary,
  },
  textPriceFocus: {
    color: colors.white,
  },
  line: {
    height: 1,
    backgroundColor: colors.borderColorGrey,
    marginHorizontal: 16,
    marginVertical: 16,
  },
  textUahContainer: {
    position: 'absolute',
    right: 34,
    marginTop: 9,
  },
  textPriceLocation: {
    color: colors.primary,
    fontSize: 18,
    marginLeft: 19,
    marginTop: 2,
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.borderColorGrey,
    marginBottom: 16,
  },
  touchableButton: {
    flexDirection: 'row',
  },
  locationIconContainer: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 23,
  },
  iconChevron: {
    color: colors.greyColorIconChevron,
    marginTop: 20,
    marginRight: 10,
  },
});
