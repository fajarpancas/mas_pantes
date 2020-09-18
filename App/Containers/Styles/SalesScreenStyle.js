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
  textBarcode: {
    flex: 1,
    textAlign: 'center'
  },
  labelStyle: {
    width: Scale(80),
    paddingBottom: Scale(15),
    fontFamily: Fonts.type.acuminProBold,
    fontSize: 12,
    color: Colors.textBlack
  },
  labelStyle2: {
    paddingBottom: Scale(15),
    marginRight: Scale(10),
    fontFamily: Fonts.type.acuminProBold,
    fontSize: 12,
    color: Colors.textBlack
  },
  formPlacholderText: {
    height: Scale(35),
    fontFamily: Fonts.type.acuminProRegular,
    paddingHorizontal: 5,
    fontSize: 13,
    padding: 0
  },
  formAlamat: {
    fontFamily: Fonts.type.acuminProRegular,
    fontSize: 13,
    paddingHorizontal: 5,
    padding: 0,
    height: Scale(45),
    lineHeight: 18,
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1,
    paddingVertical: 5,
    textAlignVertical: 'top',
    marginBottom: 10
  },
  formLabelText: {
    fontFamily: Fonts.type.acuminProBold,
    fontSize: 9,
    color: '#222222'
  },
  formPlacholderTextDisable: {
    height: Scale(23),
    fontFamily: Fonts.type.acuminProRegular,
    fontSize: 13,
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 5,
    padding: 0
  },
  formLabelTextDisable: {
    fontFamily: Fonts.type.acuminProBold,
    fontSize: 9,
    color: '#222222',
  },
  textInputStyle: {
    fontFamily: Fonts.type.acuminProBold,
    fontSize: 14,
    padding: 0,
    paddingLeft: 10,
    color: '#222222',
    flex: 1,
    backgroundColor: Colors.lightGreen
  },
  cariText: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 14,
    fontFamily: Fonts.type.acuminProBold,
  },
  kemasButton: {
    height: Scale(30),
    width: Scale(100),
    backgroundColor: Colors.alertSuccess,
    borderRadius: 4,
    justifyContent: 'center'
  },
  kemasText: {
    fontSize: 13,
    fontFamily: Fonts.type.acuminProRegular,
    textAlign: 'center',
    color: Colors.white,
    textTransform: 'uppercase'
  },
  addButton: {
    height: Scale(30),
    width: Scale(100),
    backgroundColor: Colors.alertInfo,
    borderRadius: 4,
    justifyContent: 'center'
  },
  addText: {
    fontSize: 13,
    fontFamily: Fonts.type.acuminProRegular,
    textAlign: 'center',
    color: Colors.white,
    textTransform: 'uppercase'
  },
  scanButton: {
    height: Scale(30),
    width: Scale(100),
    backgroundColor: Colors.alertError,
    borderRadius: 4,
    justifyContent: 'center',
    marginHorizontal: 10
  },
  scanText: {
    fontSize: 13,
    fontFamily: Fonts.type.acuminProRegular,
    textAlign: 'center',
    color: Colors.white,
    textTransform: 'uppercase'
  },
  headerTable: {
    marginHorizontal: 10,
    flexDirection: 'row',
    alignSelf: 'center'
  },
  borderTableNo: {
    marginHorizontal: Scale(-0.5),
    borderColor: Colors.goldBasic,
    backgroundColor: Colors.goldBasic,
    paddingVertical: 10,
    borderWidth: 1,
    width: Scale(40),
    justifyContent: 'center',
  },
  borderTableNamaBarang: {
    marginHorizontal: Scale(-0.5),
    borderColor: Colors.goldBasic,
    backgroundColor: Colors.goldBasic,
    paddingVertical: 10,
    borderWidth: 1,
    width: Scale(150),
    justifyContent: 'center',
  },
  borderTableFoto: {
    marginHorizontal: Scale(-0.5),
    borderColor: Colors.goldBasic,
    backgroundColor: Colors.goldBasic,
    paddingVertical: 10,
    borderWidth: 1,
    width: Scale(80),
    justifyContent: 'center',
  },
  borderTableHarga: {
    marginHorizontal: Scale(-0.5),
    borderColor: Colors.goldBasic,
    backgroundColor: Colors.goldBasic,
    paddingVertical: 10,
    borderWidth: 1,
    width: Scale(80),
    justifyContent: 'center',
  },
  valueTable: {
    fontSize: 12,
    color: Colors.white,
    fontFamily: Fonts.type.acuminProRegular,
    textAlign: 'center'
  },
  borderTableNoValue: {
    marginHorizontal: Scale(-0.5),
    borderBottomColor: 'lightgrey',
    borderLeftColor: 'lightgrey',
    borderRightColor: 'lightgrey',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    width: Scale(40),
    justifyContent: 'center',
  },
  borderTableNamaBarangValue: {
    marginHorizontal: Scale(-0.5),
    borderBottomColor: 'lightgrey',
    borderLeftColor: 'lightgrey',
    borderRightColor: 'lightgrey',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    width: Scale(150),
    justifyContent: 'center',
  },
  borderTableFotoValue: {
    marginHorizontal: Scale(-0.5),
    borderBottomColor: 'lightgrey',
    borderLeftColor: 'lightgrey',
    borderRightColor: 'lightgrey',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    width: Scale(80),
    justifyContent: 'center',
  },
  borderTableHargaValue: {
    marginHorizontal: Scale(-0.5),
    borderBottomColor: 'lightgrey',
    borderLeftColor: 'lightgrey',
    borderRightColor: 'lightgrey',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    width: Scale(80),
    justifyContent: 'center',
  },
  valueTableFill: {
    fontSize: 12,
    color: Colors.textGrey,
    fontFamily: Fonts.type.acuminProRegular,
    textAlign: 'center'
  },
  borderTableTotal: {
    marginHorizontal: Scale(-0.5),
    borderBottomColor: 'white',
    borderLeftColor: 'white',
    borderRightColor: 'white',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    backgroundColor: Colors.goldBasic,
    flex: 1,
    justifyContent: 'center',
  },
  formPlacholderTextTambah: {
    height: 36,
    fontFamily: Fonts.type.acuminProRegular,
    fontSize: Fonts.size.medium,
    padding: 0,
  },
  formLabelTextTambah: {
    fontFamily: Fonts.type.acuminProBold,
    fontSize: Fonts.size.h9,
    color: '#222222',
  },
  tambahButton: {
    backgroundColor: Colors.goldBasic,
    marginHorizontal: 15,
    marginBottom: 15,
    height: Scale(40),
    justifyContent: 'center'
  }
})
