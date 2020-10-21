import { Fonts, Colors } from '../Themes';
import { createStackNavigator } from 'react-navigation-stack';
import KurirBottomTabNavigation from './KurirBottomTabNavigation'
import DetailOrderScreen from '../Containers/KurirAppSection/DetailOrder'
import { createAppContainer } from 'react-navigation'
import BerikanPenilaianScreen from '../Containers/Profile/BerikanPenilaianScreen'
import HubungiKamiScreen from '../Containers/Profile/HubungiKamiScreen'
import KebijakanPrivasiScreen from '../Containers/Profile/KebijakanPrivasiScreen'
import PelajariFaqScreen from '../Containers/Profile/PelajariFaqScreen'
import EditBarang from '../Containers/SalesAppSection/Sales/EditBarang'
import KurirLocationTracking from '../Containers/KurirAppSection/KurirLocationTracking'

const AppKurirStack = createStackNavigator(
    {
        MainScreen: {
            screen: KurirBottomTabNavigation,
            navigationOptions: {
                headerShown: false
            }
        },
        EditBarang: {
            screen: EditBarang,
        },
        DetailScreen: {
            screen: DetailOrderScreen
        },
        PelajariFaqScreen: {
            screen: PelajariFaqScreen,
        },
        HubungiKamiScreen: {
            screen: HubungiKamiScreen,
        },
        KebijakanPrivasiScreen: {
            screen: KebijakanPrivasiScreen,
        },
        BerikanPenilaianScreen: {
            screen: BerikanPenilaianScreen,
        },
        KurirLocationTracking: {
            screen: KurirLocationTracking,
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

export default createAppContainer(AppKurirStack)