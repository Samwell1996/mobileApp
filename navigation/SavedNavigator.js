import { createStackNavigator } from 'react-navigation-stack';
import screens from './screens';
import SavedScreen from '../screens/Saved/SavedScreen';

const BrowseNavigator = createStackNavigator({
  [screens.Saved]: SavedScreen,
});

export default BrowseNavigator;
