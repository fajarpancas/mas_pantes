import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
import LaunchScreen from '../Containers/LaunchScreen'
import BottomTabNavigation from './BottomTabNavigation'
import SignInScreen from '../Containers/Auth/SignInScreen'
import HistoryDetailScreen from '../Containers/History/HistoryDetailScreen'
import InboxScreen from '../Containers/Home/InboxScreen'
import BeritaDetailScreen from '../Containers/Home/BeritaDetailScreen'
import BerikanPenilaianScreen from '../Containers/Profile/BerikanPenilaianScreen'
import EditProfileScreen from '../Containers/Profile/EditProfileScreen'
import HubungiKamiScreen from '../Containers/Profile/HubungiKamiScreen'
import KebijakanPrivasiScreen from '../Containers/Profile/KebijakanPrivasiScreen'
import PelajariFaqScreen from '../Containers/Profile/PelajariFaqScreen'

import styles from './Styles/NavigationStyles'
import { Fonts, Colors } from '../Themes';

const AuthStack = createStackNavigator(
  {
    SignInScreen: {
      screen: SignInScreen, navigationOptions: {
        header: null
      }
    },
  },
  {
    initialRouteName: 'SignInScreen'
  }
)

const AppStack = createStackNavigator(
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

// Manifest of possible screens
const PrimaryNav = createSwitchNavigator({
  Splash: LaunchScreen,
  Auth: AuthStack,
  App: AppStack
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'Auth',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default createAppContainer(PrimaryNav)
