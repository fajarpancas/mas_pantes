import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Fonts } from '../../Themes/'
import Scale from '../../Transforms/Scale'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  scanTheBarcode: {
    height: Scale(60),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textBarcode:{
    flex: 1,
    textAlign: 'center'
  }
})
