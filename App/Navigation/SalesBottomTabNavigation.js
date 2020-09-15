import React from 'react';
import { Text, Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createStackNavigator } from 'react-navigation-stack';

import HomeSalesScreen from '../Containers/SalesAppSection/Home/HomeSalesScreen';
import SalesScreen from '../Containers/SalesAppSection/Sales/SalesScreen';

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
                headerTitleAlign: 'center',
                headerStyle: {
                    //   backgroundColor: Colors.blueBasic,
                    elevation: 0,
                    borderBottomWidth: 0,
                }
            }
        }
    );

const SalesBottomTabNavigation = createBottomTabNavigator(
    {
        HomeSales: {
            screen: stackNav(HomeSalesScreen),
            navigationOptions: navigation => ({
                title: I18n.t('home.home'),
                tabBarIcon: ({ focused, tintColor }) => (
                    <Icon name="home" size={28} color={focused ? '#ccb102' : '#b5b3ae'} />
                ),
            }),
        },
        Sales: {
            screen: stackNav(SalesScreen),
            navigationOptions: () => ({
                title: I18n.t('laporan.laporan'),
                tabBarIcon: ({ focused, tintColor }) => (
                    <Icon name="payment" size={28} color={focused ? '#ccb102' : '#b5b3ae'} />
                ),
            }),
        },
    },
    {
        initialRouteName: 'HomeSales',
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

export default SalesBottomTabNavigation;
