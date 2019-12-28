import { createStackNavigator } from 'react-navigation-stack';
import screens from './screens';
import BrowseScreen from '../screens/Browse/BrowseScreen';

const BrowseNavigator = createStackNavigator(
  {
    [screens.Browse]: BrowseScreen,
  },
  {
    headerLayoutPreset: 'center',
  },
);

export default BrowseNavigator;
