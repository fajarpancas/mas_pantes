import { StyleSheet } from 'react-native'
import { ApplicationStyles, Fonts, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  title: {
    fontFamily: Fonts.type.acuminProBold,
    color: Colors.textBlack,
    fontSize: 20,
    marginBottom: 20
  },
  content: {
    fontFamily: Fonts.type.acuminProRegular,
    fontSize: 14,
    lineHeight: 20,
    color: Colors.textGrey
  }
})
