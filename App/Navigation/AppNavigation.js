import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
import LaunchScreen from '../Containers/LaunchScreen'
import SignInScreen from '../Containers/Auth/SignInScreen'
import AppCustomerStack from './CustomerNavigation'
import AppSalesStack from './SalesNavigation'
import AppKurirStack from './KurirNavigation'
import styles from './Styles/NavigationStyles'

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

// Manifest of possible screens
const PrimaryNav = createSwitchNavigator({
  Splash: LaunchScreen,
  Auth: AuthStack,
  App: AppCustomerStack,
  AppSales: AppSalesStack,
  AppKurir: AppKurirStack
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'Auth',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default createAppContainer(PrimaryNav)
