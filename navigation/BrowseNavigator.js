import { createStackNavigator } from 'react-navigation-stack';
import screens from './screens';
import BrowseScreen from '../screens/Browse/BrowseScreen';
import ProductViewScreen from '../screens/ProductView/ProductViewScreen';

const BrowseNavigator = createStackNavigator(
  {
    [screens.Browse]: BrowseScreen,
    [screens.ProductView]: ProductViewScreen,
  },
  {
    headerLayoutPreset: 'center',
  },
);

export default BrowseNavigator;
