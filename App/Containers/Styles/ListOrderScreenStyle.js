import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Fonts } from '../../Themes/'
import Scale from '../../Transforms/Scale'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  listOrderWrapper: {
    height: 'auto',
    padding: 10,
    width: Scale(350),
    alignSelf: 'center',
    backgroundColor: Colors.white,
    borderRadius: 5,
    elevation: 1
  },
  detailButton: {
    width: Scale(100),
    backgroundColor: Colors.borderGrey,
    height: 30,
    borderRadius: 5,
    justifyContent: 'center'
  },
  detailText: {
    textAlign: 'center',
    color: Colors.textBlack,
    fontFamily: Fonts.type.acuminProRegular
  },
  kirimButton: {
    width: Scale(350),
    backgroundColor: Colors.goldBasic,
    height: 30,
    alignSelf: 'center',
    borderRadius: 5,
    justifyContent: 'center'
  },
  kirimText: {
    textAlign: 'center',
    color: Colors.white,
    fontFamily: Fonts.type.acuminProRegular
  },
  textInfo: {
    fontFamily: Fonts.type.acuminProRegular,
    color: Colors.textBlack,
  },
  namaKurir: {
    fontFamily: Fonts.type.textBlack,
    padding: 12,
    color: Colors.textBlack
  }
})
