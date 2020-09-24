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
    width: Scale(100),
    backgroundColor: Colors.alertSuccess,
    height: 30,
    borderRadius: 5,
    justifyContent: 'center'
  },
  cancelButton: {
    width: Scale(100),
    backgroundColor: Colors.alertError,
    height: 30,
    borderRadius: 5,
    justifyContent: 'center'
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
  },
  namaKurir: {
    fontFamily: Fonts.type.textBlack,
    padding: 12,
    color: Colors.textBlack
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
    marginLeft: 18
  },
  photoContainer: {
    height: 64,
    flexDirection: 'row',
    width: Scale(335),
    alignSelf: 'center',
    borderColor: '#CCCCCC',
    borderWidth: 1,
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
    fontSize: 13,
    flex: 1,
    textAlign: 'center'
  },
  terimaButton: {
    backgroundColor: Colors.white,
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
    color: Colors.alertSuccess,
    textAlign: 'center'
  },
  rejectText: {
    fontFamily: Fonts.type.acuminProMedium,
    fontSize: 14,
    color: Colors.alertError,
    textAlign: 'center'
  }
})
