import { createSwitchNavigator } from 'react-navigation';
import screens from './screens';
import AuthNavigator from './AuthNavigator';
import AppTabNavigator from './AppTabNavigator';

const SwitchNavigator = createSwitchNavigator({
  [screens.Auth]: AuthNavigator,
  [screens.MainApp]: AppTabNavigator,
});

export default SwitchNavigator;
