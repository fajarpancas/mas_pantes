import { Fonts, Colors } from '../Themes';
import { createStackNavigator } from 'react-navigation-stack';
import SalesBottomTabNavigation from './SalesBottomTabNavigation'
import { createAppContainer } from 'react-navigation'

const AppSalesStack = createStackNavigator(
    {
        MainScreen: {
            screen: SalesBottomTabNavigation,
            navigationOptions: { header: null }
        },
    },
    {
        initialRouteName: 'MainScreen',
        headerLayoutPreset: 'center',
        defaultNavigationOptions: {
            headerTintColor: 'white',
            headerTitleStyle: {
                color: 'white',
                fontSize: 16,
                fontWeight: '600',
                fontFamily: Fonts.type.acuminProRegular,
                textTransform: 'capitalize'
            },
            headerStyle: {
                backgroundColor: Colors.goldBasic,
            }
        }
    }
)

export default createAppContainer(AppSalesStack)