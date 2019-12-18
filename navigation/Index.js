import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { NavigationService } from '../services';
import AppSwitchNavigator from './AppSwitchNavigator';
import CreatePostNavigator from './CreatePostNavigator';
import screens from './screens';

const StackNavigator = createStackNavigator({
    [screens.App]: AppSwitchNavigator,
    [screens.CreatePostModal]: CreatePostNavigator,
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);

const RootNavigator = createAppContainer(StackNavigator);

export default () => (
  <RootNavigator
    ref={(navigation) => NavigationService.init(navigation)}
  />
);
