import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import ProgressOrderScreen from './ProgressOrder'
import AvailOrderScreen from './AvailOrder'
import FinishOrderScreen from './FinishOrder'
import Scale from '../../Transforms/Scale';
import { Colors, Fonts } from '../../Themes';

const TabNavigator = createMaterialTopTabNavigator({
  Avail: AvailOrderScreen,
  Progress: ProgressOrderScreen,
  Finish: FinishOrderScreen,
},
  {
    initialRouteName: 'Avail',
    tabBarOptions: {
      upperCaseLabel: false,
      activeTintColor: Colors.goldBasic,
      labelStyle: {
        fontSize: 14,
        color: '#888888',
        fontFamily: Fonts.type.acuminProRegular
      },
      tabStyle: {
        width: Scale(125),
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
