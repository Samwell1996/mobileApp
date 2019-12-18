import { createStackNavigator } from 'react-navigation-stack';
import screens from './screens';
import ProfileScreen from '../screens/Profile/ProfileScreen';

const ProfileNavigator = createStackNavigator({
  [screens.Profile]: ProfileScreen,
});

export default ProfileNavigator;
