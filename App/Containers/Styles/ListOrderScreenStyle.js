import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Fonts } from '../../Themes/'
import Scale from '../../Transforms/Scale'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  listOrderWrapper: {
    height: 'auto',
    padding: 15,
    width: Scale(350),
    alignSelf: 'center',
    backgroundColor: Colors.white,
    borderRadius: 5,
    elevation: 1
  },
  detailButton: {
    borderColor: '#00b9f2',
    borderWidth: 1,
    width: Scale(40),
    height: Scale(40),
    borderRadius: Scale(40),
    justifyContent: 'center',
  },
  photoView: {
    height: Scale(500),
    width: Scale(325),
    borderRadius: 4,
    alignSelf: 'center'
  },
  chevronRight: {
    width: Scale(23),
    height: Scale(27),
  },
  containerTimeslot: {
    flexDirection: 'column',
    flex: 1,
    height: 44,
    borderBottomColor: '#EEEEEE',
    borderBottomWidth: 1,
    marginHorizontal: 5
  },
  submitText: {
    fontFamily: Fonts.type.acuminProMedium,
    color: Colors.white,
    textTransform: 'uppercase',
    fontSize: 14,
    textAlign: 'center'
  },
  estimasiWrapper: {
    padding: 10,
    borderColor: Colors.borderGrey,
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 5
  },
  submitButton: {
    backgroundColor: Colors.alertInfo,
    borderRadius: 4,
    height: 40,
    justifyContent: 'center',
    marginTop: 8
  },
  text: {
    fontFamily: Fonts.type.azoSansRegular,
    fontSize: 13,
    color: Colors.textBlack
  },
  tglJam: {
    fontFamily: Fonts.type.acuminProMedium,
    fontSize: 13,
    paddingRight: 10,
    color: Colors.textBlack
  },
  textEstimasi: {
    fontFamily: Fonts.type.acuminProBold,
    fontSize: 13,
    paddingRight: 10,
    color: Colors.textBlack
  },
  time: {
    fontFamily: Fonts.type.azoSansRegular,
    fontSize: 13,
    paddingRight: 10,
    color: Colors.textBlack
  },
  detailText: {
    textAlign: 'center',
    color: Colors.textBlack,
    fontFamily: Fonts.type.acuminProRegular
  },
  ambilButton: {
    borderColor: '#00b9f2',
    borderWidth: 1,
    width: Scale(40),
    height: Scale(40),
    borderRadius: Scale(40),
    justifyContent: 'center',
  },
  cancelButton: {
    borderColor: 'red',
    borderWidth: 1,
    width: Scale(40),
    height: Scale(40),
    borderRadius: Scale(40),
    justifyContent: 'center',

  },
  ambilText: {
    textAlign: 'center',
    color: Colors.white,
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
    lineHeight: 18
  },
  textInfoTotal: {
    fontFamily: Fonts.type.acuminProMedium,
    color: Colors.textBlack,
    fontSize: 13
  },
  textInfoAlamat: {
    fontFamily: Fonts.type.acuminProRegular,
    color: Colors.textBlack,
    lineHeight: 18,
    flex: 1
  },
  textName: {
    fontFamily: Fonts.type.acuminProBold,
    color: Colors.textBlack,
    lineHeight: 18
  },
  namaKurir: {
    fontFamily: Fonts.type.textBlack,
    padding: 12,
    color: Colors.textBlack
  },
  namaKurirBold: {
    fontFamily: Fonts.type.acuminProRegular,
    color: Colors.textGrey,
    fontSize: 12
  },
  statusTextKurirAktif: {
    fontFamily: Fonts.type.acuminProMedium,
    color: 'green',
    fontSize: 10,
    marginLeft: Scale(5)
  },
  statusTextKurir: {
    fontFamily: Fonts.type.acuminProMedium,
    color: 'red',
    fontSize: 10,
    marginLeft: Scale(5)
  },
  statusBullet: {
    marginTop: Scale(2),
    marginLeft: Scale(15),
    height: Scale(7),
    width: Scale(7),
    borderRadius: 7,
    backgroundColor: 'red',
  },
  statusBulletAktif: {
    marginTop: Scale(2),
    marginLeft: Scale(15),
    height: Scale(7),
    width: Scale(7),
    borderRadius: 7,
    backgroundColor: 'green',
  },
  valueKurirBold: {
    fontFamily: Fonts.type.acuminProMedium,
    color: Colors.textBlack,
    fontSize: 13
  },
  valueKurirBoldRed: {
    fontFamily: Fonts.type.acuminProMedium,
    color: Colors.alertError,
    fontSize: 13,
  },
  textKirim: {
    fontFamily: Fonts.type.acuminProMedium,
    marginTop: 2,
    fontSize: 12,
    lineHeight: 18,
    color: '#00b9f2'
  },
  textSetor: {
    fontFamily: Fonts.type.acuminProMedium,
    marginTop: 2,
    flexWrap: 'wrap',
    width: Scale(70),
    fontSize: 12,
    textAlign: 'center',
    color: Colors.warm_grey
  },
  textSetorSuccess: {
    fontFamily: Fonts.type.acuminProMedium,
    marginTop: 2,
    flexWrap: 'wrap',
    width: Scale(70),
    fontSize: 12,
    textAlign: 'center',
    color: Colors.alertSuccess
  },
  textBatal: {
    fontFamily: Fonts.type.acuminProMedium,
    marginTop: 2,
    fontSize: 12,
    lineHeight: 18,
    color: 'red'
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
    fontSize: 13,
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 5,
    padding: 0
  },
  formAlamat: {
    fontFamily: Fonts.type.acuminProRegular,
    fontSize: 13,
    paddingHorizontal: 5,
    padding: 0,
    height: 'auto',
    color: Colors.textBlack,
    lineHeight: 18,
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1,
    paddingVertical: 5,
    textAlignVertical: 'top',
    backgroundColor: '#f2f2f2',
    marginBottom: 10
  },
  formLabelText: {
    fontFamily: Fonts.type.acuminProBold,
    fontSize: 9,
    color: '#222222'
  },
  formPlacholderTextDisable: {
    height: Scale(35),
    fontFamily: Fonts.type.acuminProRegular,
    paddingHorizontal: 5,
    fontSize: 13,
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
  photo: {
    height: Scale(100),
    width: Scale(100),
    borderRadius: 4,
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
  photoContainerNoBorder: {
    flexDirection: 'row',
    marginLeft: 18,
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
  bottomInfo: {
    backgroundColor: Colors.textBlack,
    height: Scale(60),
    flexDirection: 'row',
    paddingTop: 20
  },
  textKemas: {
    color: Colors.white,
    fontFamily: Fonts.type.acuminProRegular,
    fontSize: 12,
    flex: 1,
    lineHeight: 15,
    textAlign: 'center'
  },
  terimaButton: {
    backgroundColor: Colors.alertSuccess,
    borderColor: Colors.alertSuccess,
    borderWidth: 1,
    width: Scale(335),
    height: 40,
    borderRadius: 5,
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  rejectButton: {
    backgroundColor: Colors.white,
    borderColor: Colors.alertError,
    borderWidth: 1,
    width: Scale(335),
    height: 40,
    borderRadius: 5,
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  terimaText: {
    fontFamily: Fonts.type.acuminProMedium,
    fontSize: 14,
    color: Colors.white,
    textAlign: 'center'
  },
  rejectText: {
    fontFamily: Fonts.type.acuminProMedium,
    fontSize: 14,
    color: Colors.alertError,
    textAlign: 'center'
  },
  textError: {
    textAlign: 'left',
    fontSize: 10,
    color: 'red',
    fontFamily: Fonts.type.azoSansRegular,
    marginLeft: 20
  },
  menungguOrder: {
    fontFamily: Fonts.type.acuminProRegular,
    fontSize: 14,
    color: Colors.alertError,
    textAlign: 'left'
  },
  finishOrder: {
    fontFamily: Fonts.type.acuminProRegular,
    fontSize: 14,
    color: Colors.alertSuccess,
    textAlign: 'left'
  },
  statusText: {
    fontFamily: Fonts.type.acuminProBold,
    fontSize: 14,
    marginBottom: 1,
    color: Colors.textBlack,
    textAlign: 'left'
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
  getlokasiWrapper: {
    marginTop: Scale(10),
    height: 30,
    paddingHorizontal: 12,
    borderRadius: 4,
    backgroundColor: Colors.alertInfo,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  getlokasiWrapperDisabled: {
    marginTop: Scale(10),
    height: 30,
    paddingHorizontal: 12,
    borderRadius: 4,
    backgroundColor: Colors.alertInfo,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.5
  },
  getLokasiText: {
    color: 'white',
    fontFamily: Fonts.type.acuminProExtraLight,
    fontSize: 12
  },
  border: {
    borderTopColor: '#c7c6c1',
    borderTopWidth: 0.6,
    flex: 1
  },
  storModalContainer: {
    backgroundColor: 'white',
    padding: 15,
    width: Scale(300),
    alignSelf: 'center',
    borderRadius: 6
  },
  textStorconfirm: {
    fontFamily: Fonts.type.acuminProRegular,
    fontSize: 13,
    marginHorizontal: Scale(20),
    color: Colors.textGrey,
    lineHeight: 18,
    textAlign: 'center'
  },
  textStorconfirmTitle: {
    fontFamily: Fonts.type.acuminProMedium,
    fontSize: 18,
    marginBottom: 10,
    marginTop: 5,
    color: Colors.textBlack,
    textAlign: 'center'
  },
  tandaiButton: {
    height: Scale(35),
    backgroundColor: Colors.alertSuccess,
    marginTop: 20,
    borderRadius: 4,
    justifyContent: 'center',
    marginHorizontal: 10
  },
  batalkanButton: {
    height: Scale(35),
    backgroundColor: Colors.alertError,
    marginTop: 20,
    borderRadius: 4,
    justifyContent: 'center',
    marginHorizontal: 10
  },
  tandaiText: {
    fontFamily: Fonts.type.acuminProMedium,
    color: Colors.white,
    textAlign: 'center'
  },
  batalButton: {
    height: Scale(35),
    marginTop: 5,
    borderRadius: 4,
    justifyContent: 'center'
  },
  batalText: {
    fontFamily: Fonts.type.acuminProMedium,
    color: Colors.textGrey,
    textAlign: 'center'
  },
  batalkanWrapper:{
    backgroundColor: Colors.alertError,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: Scale(33),
    marginTop: 10,
    borderRadius: 4
  },
  closeOrderWrapper:{
    backgroundColor: Colors.alertInfo,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: Scale(33),
    marginTop: 10,
    borderRadius: 4
  }
})
