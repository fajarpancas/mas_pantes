import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import ProgressOrderScreen from './ProgressOrder'
import AvailOrderScreen from './AvailOrder'
import FinishOrderScreen from './FinishOrder'
import OrderDiambilScreen from './AmbiOrder'
import Scale from '../../Transforms/Scale';
import { Colors, Fonts } from '../../Themes';

const TabNavigator = createMaterialTopTabNavigator({
  Tersedia: AvailOrderScreen,
  Diambil: OrderDiambilScreen,
  Proses: ProgressOrderScreen,
  History: FinishOrderScreen,
},
  {
    initialRouteName: 'Tersedia',
    tabBarOptions: {
      upperCaseLabel: false,
      activeTintColor: Colors.goldBasic,
      labelStyle: {
        fontSize: 14,
        color: '#888888',
        fontFamily: Fonts.type.acuminProRegular
      },
      tabStyle: {
        width: Scale(94),
        height: 44
      },
      indicatorStyle: {
        borderBottomColor: Colors.goldBasic,
        borderBottomWidth: 2
      },
      style: {
        backgroundColor: '#FFFFFF',
      }
    }
  });

export default createAppContainer(TabNavigator)
