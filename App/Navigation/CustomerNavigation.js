import HistoryDetailScreen from '../Containers/History/HistoryDetailScreen'
import InboxScreen from '../Containers/Home/InboxScreen'
import BeritaDetailScreen from '../Containers/Home/BeritaDetailScreen'
import BerikanPenilaianScreen from '../Containers/Profile/BerikanPenilaianScreen'
import EditProfileScreen from '../Containers/Profile/EditProfileScreen'
import HubungiKamiScreen from '../Containers/Profile/HubungiKamiScreen'
import KebijakanPrivasiScreen from '../Containers/Profile/KebijakanPrivasiScreen'
import PelajariFaqScreen from '../Containers/Profile/PelajariFaqScreen'
import { Fonts, Colors } from '../Themes';
import { createStackNavigator } from 'react-navigation-stack';
import BottomTabNavigation from './BottomTabNavigation'
import { createAppContainer } from 'react-navigation'

const AppCustomerStack = createStackNavigator(
    {
        MainScreen: {
            screen: BottomTabNavigation,
            navigationOptions: { header: null }
        },
        HistoryDetailScreen: {
            screen: HistoryDetailScreen,
        },
        InboxScreen: {
            screen: InboxScreen,
        },
        BerikanPenilaianScreen: {
            screen: BerikanPenilaianScreen,
        },
        BeritaDetailScreen: {
            screen: BeritaDetailScreen,
        },
        PelajariFaqScreen: {
            screen: PelajariFaqScreen,
        },
        EditProfileScreen: {
            screen: EditProfileScreen,
        },
        HubungiKamiScreen: {
            screen: HubungiKamiScreen,
        },
        KebijakanPrivasiScreen: {
            screen: KebijakanPrivasiScreen,
        }
    },
    {
        initialRouteName: 'MainScreen',
        // initialRouteName: 'ChangeProfileScreen',
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
                // elevation: 0
            }
        }
    }
)

export default createAppContainer(AppCustomerStack)