import { Fonts, Colors } from '../Themes';
import { createStackNavigator } from 'react-navigation-stack';
import KurirBottomTabNavigation from './KurirBottomTabNavigation'
import DetailOrderScreen from '../Containers/KurirAppSection/DetailOrder'
import { createAppContainer } from 'react-navigation'

const AppKurirStack = createStackNavigator(
    {
        MainScreen: {
            screen: KurirBottomTabNavigation,
            navigationOptions: { header: null }
        },
        DetailScreen: {
            screen: DetailOrderScreen,
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

export default createAppContainer(AppKurirStack)