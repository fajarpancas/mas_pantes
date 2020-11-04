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
  },
  listOrderWrapper: {
    height: 'auto',
    padding: 15,
    width: Scale(350),
    alignSelf: 'center',
    backgroundColor: Colors.white,
    borderRadius: 5,
    elevation: 1
  },
  textInfo: {
    fontFamily: Fonts.type.acuminProSemiBold,
    color: Colors.textBlack,
    lineHeight: 18
  },
  textName: {
    fontFamily: Fonts.type.acuminProBold,
    color: Colors.textBlack,
    lineHeight: 18
  },
  pembayaranTitle: {
    fontFamily: Fonts.type.acuminProBold,
    fontSize: 14,
    marginBottom: 1,
    color: Colors.textBlack,
    textAlign: 'left'
  },
  pembayaran: {
    fontFamily: Fonts.type.acuminProRegular,
    fontSize: 14,
    marginLeft: 5,
    marginBottom: 1,
    color: Colors.textBlack,
    textAlign: 'left'
  },
  detailButton: {
    borderColor: '#00b9f2',
    borderWidth: 1,
    width: Scale(40),
    height: Scale(40),
    borderRadius: Scale(40),
    justifyContent: 'center',
  },
  textInfoAlamat: {
    fontFamily: Fonts.type.acuminProRegular,
    color: Colors.textBlack,
    lineHeight: 18,
    flex: 1
  },
  textKirim: {
    fontFamily: Fonts.type.acuminProMedium,
    marginTop: 2,
    fontSize: 12,
    lineHeight: 18,
    color: '#00b9f2'
  },
  textInfoKirim: {
    fontFamily: Fonts.type.acuminProSemiBold,
    color: Colors.textBlack,
    lineHeight: 18,
    flex: 1
  },
})
