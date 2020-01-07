import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';
import { headerHeight } from '../../styles/dimensions'

export const s = StyleSheet.create({
  container: {
    backgroundColor: colors.grey,
    flex: 1,
  },
  shadow: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    paddingTop: 20,
    height: headerHeight,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
    zIndex: 5,
  },
  icon: {
    color: colors.white,
    paddingHorizontal: 14,
  },
  containerPhotos: {
    overflow: 'hidden',
    height: 356,
  },
  photos: {
    position: 'absolute',
    height: 356,
    width: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    zIndex: 2,
  },
  photosNotFound: {
    overflow: 'hidden',
    height: 356,
    width: '100%',
    zIndex: 1,
  },
  absoluteNotFound: {
    position: 'absolute',
  },
  title: {
    position: 'absolute',
    fontSize: 18,
    color: colors.white,
    bottom: 52,
    left: 16,
    fontWeight: 'bold',
    zIndex: 4,
  },
  price: {
    position: 'absolute',
    fontSize: 18,
    color: colors.white,
    bottom: 52,
    right: 16,
    fontWeight: 'bold',
    zIndex: 4,
  },
  containerLocation: {
    zIndex: 3,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    bottom: 50,
  },
  textLocation: {
    fontSize: 18,
    color: colors.white,
    opacity: 0.8,
  },
  iconLocation: {
    color: colors.white,
    opacity: 0.8,
    marginHorizontal: 5,
    bottom: -2,
  },
  bottomContainer: {
    backgroundColor: colors.white,
  },
  description: {
    color: colors.textColors,
    fontSize: 18,
    marginHorizontal: 16,
    paddingVertical: 8,
  },
});
