import React from 'react';
import { Text, Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from '../Containers/Home/HomeScreen';
import HistoryScreen from '../Containers/History/HistoryScreen';
import LocationScreen from '../Containers/Location/LocationScreen';
import ProfileScreen from '../Containers/Profile/ProfileScreen';

import I18n from '../I18n';
import { Images, Colors, Fonts, ApplicationStyles } from '../Themes';

const styles = {
    icon: {
        height: 25,
        width: 25,
        resizeMode: 'contain',
    },
    headerTitle: {
        fontFamily: Fonts.type.acuminProMedium,
        fontSize: 16,
        color: 'white',
        fontWeight: '200',
        textTransform: 'capitalize',
    },
};

const stackNav = screen =>
    createStackNavigator(
        {
            stack: {
                screen,
            },
        },
        {
            headerMode: 'screen',
            defaultNavigationOptions: {
                title: '',
                headerTitleStyle: {
                    color: 'black',
                    fontSize: 16,
                    fontWeight: '600',
                    textTransform: 'capitalize',
                },
                headerTitleAlign: 'left',
                headerStyle: {
                    //   backgroundColor: Colors.blueBasic,
                    elevation: 0,
                    borderBottomWidth: 0,
                }
            }
        }
    );

const bottomTab = createBottomTabNavigator(
    {
        Home: {
            screen: stackNav(HomeScreen),
            navigationOptions: navigation => ({
                title: I18n.t('home.home'),
                tabBarIcon: ({ focused, tintColor }) => (
                    <Icon name="home" size={28} color={focused ? '#ccb102' : '#b5b3ae'} />
                ),
            }),
        },
        History: {
            screen: stackNav(HistoryScreen),
            navigationOptions: () => ({
                title: I18n.t('history.history'),
                tabBarIcon: ({ focused, tintColor }) => (
                    <Icon name="history" size={28} color={focused ? '#ccb102' : '#b5b3ae'} />
                ),
            }),
        },
        Location: {
            screen: stackNav(LocationScreen),
            navigationOptions: navigation => ({
                title: I18n.t('location.location'),
                tabBarIcon: ({ focused, tintColor }) => (
                    <Icon name="location-on" size={28} color={focused ? '#ccb102' : '#b5b3ae'} />
                ),
            }),
        },
        Profile: {
            screen: stackNav(ProfileScreen),
            navigationOptions: navigation => ({
                title: I18n.t('profile.profile'),
                tabBarIcon: ({ focused, tintColor }) => (
                    <Icon name="person" size={28} color={focused ? '#ccb102' : '#b5b3ae'} />
                ),
            }),
        },
    },
    {
        //"Explore",
        initialRouteName: 'Home',
        tabBarOptions: {
            activeTintColor: '#ccb102',
            labelStyle: {
                fontFamily: Fonts.type.acuminProRegular,
                fontSize: 11,
                fontWeight: '400',
            },
            style: {
                height: 55,
                marginBottom: 5
            },
        },
    },
);

export default bottomTab;
