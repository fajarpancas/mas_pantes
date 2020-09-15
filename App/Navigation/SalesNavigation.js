import { Fonts, Colors } from '../Themes';
import { createStackNavigator } from 'react-navigation-stack';
import SalesBottomTabNavigation from './SalesBottomTabNavigation'
import { createAppContainer } from 'react-navigation'
import TambahBarang from '../Containers/SalesAppSection/Sales/TambahBarang'

const AppSalesStack = createStackNavigator(
    {
        MainScreen: {
            screen: SalesBottomTabNavigation,
            navigationOptions: { header: null }
        },
        TambahBarang: {
            screen: TambahBarang,
        }
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