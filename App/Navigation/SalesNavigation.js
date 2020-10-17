import { Fonts, Colors } from '../Themes';
import { createStackNavigator } from 'react-navigation-stack';
import SalesBottomTabNavigation from './SalesBottomTabNavigation'
import { createAppContainer } from 'react-navigation'
import TambahBarang from '../Containers/SalesAppSection/Sales/TambahBarang'
import EditBarang from '../Containers/SalesAppSection/Sales/EditBarang'
import BerikanPenilaianScreen from '../Containers/Profile/BerikanPenilaianScreen'
import HubungiKamiScreen from '../Containers/Profile/HubungiKamiScreen'
import KebijakanPrivasiScreen from '../Containers/Profile/KebijakanPrivasiScreen'
import PelajariFaqScreen from '../Containers/Profile/PelajariFaqScreen'
import DetailOrderScreen from '../Containers/KurirAppSection/DetailOrder'

const AppSalesStack = createStackNavigator(
    {
        MainScreen: {
            screen: SalesBottomTabNavigation,
            navigationOptions: {
                headerShown: false
            }
        },
        DetailScreen: {
            screen: DetailOrderScreen
        },
        TambahBarang: {
            screen: TambahBarang,
        },
        EditBarang: {
            screen: EditBarang,
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