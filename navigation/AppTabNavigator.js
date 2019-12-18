import React from 'react';
import T from 'prop-types';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Text } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import screens from './screens';
import BrowseNavigator from './BrowseNavigator';
import ProfileNavigator from './ProfileNavigator';
import SavedNavigator from './SavedNavigator';
import InboxNavigator from './InboxNavigator';
import colors from '../styles/colors';
import s from '../styles/styles';

const SwitchNavigator = createBottomTabNavigator(
  {
    [screens.BrowseTab]: {
      screen: BrowseNavigator,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="md-search" size={30} color={tintColor} />
        ),
        tabBarLabel: (props) => (
          <Text
            style={[
              s.tabCenter,
              {
                color: props.focused
                  ? colors.primary
                  : colors.tabColorGrey,
              },
            ]}
          >
            Browse
          </Text>
        ),
      },
    },
    [screens.SavedTab]: {
      screen: SavedNavigator,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="md-bookmark" size={30} color={tintColor} />
        ),
        tabBarLabel: (props) => (
          <Text
            style={[
              s.tabCenter,
              {
                color: props.focused
                  ? colors.primary
                  : colors.tabColorGrey,
              },
            ]}
          >
            Saved
          </Text>
        ),
      },
    },
    [screens.InboxTab]: {
      screen: InboxNavigator,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <MaterialCommunityIcons
            name="inbox"
            size={30}
            borderRadius={2}
            color={tintColor}
          />
        ),
        tabBarLabel: (props) => (
          <Text
            style={[
              s.tabCenter,
              {
                color: props.focused
                  ? colors.primary
                  : colors.tabColorGrey,
              },
            ]}
          >
            Inbox
          </Text>
        ),
      },
    },
    [screens.ProfileTab]: {
      screen: ProfileNavigator,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="md-person" size={30} color={tintColor} />
        ),
        tabBarLabel: (props) => (
          <Text
            style={[
              s.tabCenter,
              {
                color: props.focused
                  ? colors.primary
                  : colors.tabColorGrey,
              },
            ]}
          >
            Profile
          </Text>
        ),
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: colors.primary,
      inactiveTintColor: colors.tabColorGrey,
    },
  },
);

SwitchNavigator.propTypes = {
  tintColor: T.string,
};

export default SwitchNavigator;
