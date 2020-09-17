import React from 'react';
import { Text, Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createStackNavigator } from 'react-navigation-stack';

import HomeKurirScreen from '../Containers/KurirAppSection/HomeKurirScreen';
import ListOrderScreen from '../Containers/KurirAppSection/ListOrderScreen';
import AkunScreen from '../Containers/SalesAppSection/Akun/AkunScreen';

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
            headerMode: 'none',
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

const KurirBottomTabNavigation = createBottomTabNavigator(
    {
        Sales: {
            screen: stackNav(ListOrderScreen),
            navigationOptions: () => ({
                title: I18n.t('List Orderan'),
                tabBarIcon: ({ focused, tintColor }) => (
                    <Icon name="list" size={28} color={focused ? '#ccb102' : '#b5b3ae'} />
                ),
            }),
        },
        Setting: {
            screen: stackNav(AkunScreen),
            navigationOptions: () => ({
                title: 'Akun',
                tabBarIcon: ({ focused, tintColor }) => (
                    <Icon name="account-circle" size={28} color={focused ? '#ccb102' : '#b5b3ae'} />
                ),
            }),
        },
    },
    {
        initialRouteName: 'Sales',
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

export default KurirBottomTabNavigation;
