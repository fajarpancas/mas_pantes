import '../Config'
import DebugConfig from '../Config/DebugConfig'
import React, { Fragment } from 'react'
import { Provider } from 'react-redux'
import RootContainer from './RootContainer'
import createStore from '../Redux'
import { enableScreens } from 'react-native-screens';
import DropdownAlert from 'react-native-dropdownalert';
import { DropDownHolder } from '../Components'

enableScreens();
// create our store
const store = createStore()

/**
 * Provides an entry point into our application.  Both index.ios.js and index.android.js
 * call this component first.
 *
 * We create our Redux store here, put it into a provider and then bring in our
 * RootContainer.
 *
 * We separate like this to play nice with React Native's hot reloading.
 */
const App = () => {
  return (
    <Fragment>
      <Provider store={store}>
        <RootContainer />
        <DropdownAlert ref={ref => DropDownHolder.setDropDown(ref)} />
      </Provider>
    </Fragment>
  );
};

// allow reactotron overlay for fast design in dev mode
export default DebugConfig.useReactotron
  ? console.tron.overlay(App)
  : App
