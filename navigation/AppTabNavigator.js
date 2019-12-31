import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Text, View } from 'react-native';
import {
  Ionicons,
  MaterialCommunityIcons,
  AntDesign,
} from '@expo/vector-icons';
import screens from './screens';
import CustomTabBar from './components/CustomTabBar';
import EmptyScreen from '../screens/Empty/EmptyScreen';
import BrowseNavigator from './BrowseNavigator';
import ProfileNavigator from './ProfileNavigator';
import SavedNavigator from './SavedNavigator';
import InboxNavigator from './InboxNavigator';
import colors from '../styles/colors';
import s from '../styles/styles';
import style from './components/styles';

const routes = {
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
  [screens.Empty]: {
    screen: EmptyScreen,
    navigationOptions: {
      tabBarIcon: () => (
        <View style={style.plusCenter}>
          <AntDesign
            name="pluscircle"
            size={56}
            color={colors.primary}
          />
        </View>
      ),
      tabBarLabel: () => <View style={style.plusBottom} />,
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
};

export default createBottomTabNavigator(routes, {
  tabBarComponent: CustomTabBar,
  initialRouteName: screens.BrowseTab,
  tabBarOptions: {
    activeTintColor: colors.primary,
    inactiveTintColor: colors.tabColorGrey,
    style: {
      borderTopColor: colors.colorNone,
    },
  },
});
