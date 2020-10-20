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
  cusSelect: {
    fontFamily: Fonts.type.acuminProRegular,
    color: Colors.textBlack,
    fontSize: 12,
    marginLeft: 5
  },
  radioIcon: {
    width: Scale(15),
    height: Scale(15)
  },
  textError: {
    textAlign: 'left',
    fontSize: 10,
    color: 'red',
    fontFamily: Fonts.type.azoSansRegular,
  },
  textBarcode: {
    flex: 1,
    textAlign: 'center'
  },
  rupiah: {
    fontSize: 14,
    fontFamily: Fonts.type.acuminProBold,
    color: Colors.textGrey,
    width: Scale(30)
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
    // paddingHorizontal: 5,
    fontSize: 13,
    padding: 0
  },
  formPlacholderTextTelepon: {
    // height: Scale(35),
    fontFamily: Fonts.type.acuminProRegular,
    // paddingHorizontal: 5,
    fontSize: 13,
    padding: 0
  },
  formAlamat: {
    fontFamily: Fonts.type.acuminProRegular,
    fontSize: 13,
    // paddingHorizontal: 5,
    padding: 0,
    height: Scale(45),
    lineHeight: 18,
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1,
    paddingVertical: 5,
    textAlignVertical: 'top'
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
    // paddingHorizontal: 5,
    marginTop: 10,
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
    width: Scale(110),
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
    width: Scale(110),
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
    width: Scale(110),
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
    // marginHorizontal: 5
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
    width: Scale(100),
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
  borderTableHargaNama: {
    marginHorizontal: Scale(-0.5),
    borderColor: Colors.goldBasic,
    backgroundColor: Colors.goldBasic,
    paddingVertical: 10,
    borderWidth: 1,
    width: Scale(100),
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
    width: Scale(100),
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
  borderTableHargaValueNama: {
    marginHorizontal: Scale(-0.5),
    borderBottomColor: 'lightgrey',
    borderLeftColor: 'lightgrey',
    borderRightColor: 'lightgrey',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    width: Scale(100),
    justifyContent: 'center',
    padding: 4
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
    width: Scale(240),
  },
  borderTableTotalValue: {
    marginHorizontal: Scale(-0.5),
    borderBottomColor: 'white',
    borderLeftColor: 'white',
    borderRightColor: 'white',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    backgroundColor: Colors.goldBasic,
    width: Scale(80),
  },
  borderNoValue: {
    marginHorizontal: Scale(-0.5),
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    paddingVertical: 10,
    backgroundColor: Colors.goldBasic,
    width: Scale(79),
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
  },
  photoContainerNoBorder: {
    flexDirection: 'row',
    marginTop: 7
  },
  photoContainer: {
    height: 64,
    flexDirection: 'row',
    width: Scale(335),
    alignSelf: 'center',
    borderColor: '#CCCCCC',
    borderWidth: 1,
    marginTop: 7,
    borderRadius: 4
  },
  icPhoto: {
    fontFamily: Fonts.type.acuminProMedium,
    fontSize: 14,
    color: Colors.textBlack
  },
  uploadPhoto: {
    fontFamily: Fonts.type.acuminProRegular,
    fontSize: 12,
    color: '#57A9DD',
  },
  changePhoto: {
    fontFamily: Fonts.type.acuminProMedium,
    fontSize: 12,
    color: '#57A9DD',
    marginLeft: 10
  },
  photo: {
    height: Scale(100),
    width: Scale(100),
    borderRadius: 4,
  },
  photoView: {
    height: Scale(500),
    width: Scale(325),
    borderRadius: 4,
    alignSelf: 'center'
  },
  uploadIcon: {
    height: Scale(30),
    width: Scale(35),
    marginHorizontal: 20
  },
  viewIcon: {
    height: Scale(64),
    width: Scale(64),
    marginHorizontal: 12
  },
  unggah: {
    fontFamily: Fonts.type.acuminProRegular,
    fontSize: 10,
    color: '#57A9DD',
    marginTop: 5
  },
  unggahGagal: {
    fontFamily: Fonts.type.acuminProRegular,
    fontSize: 10,
    color: 'red',
    marginTop: 5
  },
  wrapperListKurir: {
    backgroundColor: 'white',
    width: Scale(355),
    padding: 10,
    elevation: 1,
    alignSelf: 'center',
    borderRadius: 5
  },
  namaKurirText2: {
    fontFamily: Fonts.type.acuminProRegular,
    fontSize: 13,
    width: Scale(100)
  },
  namaKurirText: {
    fontFamily: Fonts.type.acuminProRegular,
    fontSize: 13,
  },
  titleTextTotal: {
    fontFamily: Fonts.type.acuminProMedium,
    fontSize: 13,
  },
  titleTextName: {
    fontFamily: Fonts.type.acuminProMedium,
    fontSize: 12,
  },
})
