import { StyleSheet } from 'react-native'
import { ApplicationStyles, Fonts, Colors } from '../../Themes/'
import Scale from '../../Transforms/Scale'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  codeOrder: {
    fontFamily: Fonts.type.acuminProRegular,
    fontSize: 14,
    color: '#63ccc5'
  },
  listWrapper: {
    backgroundColor: Colors.white,
    width: Scale(340),
    alignSelf: 'center',
    marginTop: 8,
    marginBottom: 8,
    paddingTop: 15,
    elevation: 1
  },
  date: {
    fontSize: 11,
    fontFamily: Fonts.type.acuminProRegular,
    textAlign: 'right',
    color: Colors.textGrey
  },
  valueText: {
    color: Colors.textBlack,
    fontFamily: Fonts.type.acuminProRegular,
    fontSize: 12
  },
  bottomWrapper: {
    backgroundColor: '#fafafa',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 15,
    paddingLeft: 10
  },
  tokomasName: {
    fontFamily:Fonts.type.acuminProRegular,
    fontSize: 13,
    color: Colors.textGrey,
    marginLeft: 5
  },
  poin: {
    fontFamily:Fonts.type.acuminProRegular,
    fontSize: 13,
    color: 'orange',
    textAlign: 'right'
  }
})
