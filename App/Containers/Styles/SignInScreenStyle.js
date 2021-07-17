import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Fonts } from '../../Themes/'
import Scale from '../../Transforms/Scale'
const WIDTH_RIGHT_ICON_SETTING = Scale(16)

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  containerMenu: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderBottomColor: '#eeeeee',
    borderBottomWidth: 1,
    paddingVertical: 15,
    marginHorizontal: 17
  },
  modalDeleteWrapper: {
    width: Scale(300),
    height: 'auto',
    paddingHorizontal: Scale(20),
    paddingTop: Scale(20),
    paddingBottom: Scale(10),
    backgroundColor: Colors.white,
    alignSelf: 'center',
    borderRadius: 10
  },
  cutomList: {
    borderBottomColor: Colors.borderGrey,
    borderBottomWidth: 1,
    paddingVertical: 10,
    marginBottom: 10
  },
  textError: {
    textAlign: 'left',
    fontSize: 10,
    marginTop: 1,
    color: 'red',
    marginBottom: 10,
    fontFamily: Fonts.type.azoSansRegular,
  },
  iconMenuSettingRight: {
    width: WIDTH_RIGHT_ICON_SETTING,
    height: WIDTH_RIGHT_ICON_SETTING,
    resizeMode: 'contain',
    justifyContent: 'flex-start'
  },
  signInBtn: {
    backgroundColor: Colors.goldBasic,
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    marginTop: 10
  },
  signInButtonText: {
    color: Colors.white,
    fontFamily: Fonts.type.acuminProRegular,
    fontSize: 14,
    textAlign: 'center'
  },
  formPlacholderText: {
    height: 36,
    fontFamily: Fonts.type.acuminProRegular,
    fontSize: Fonts.size.medium,
    padding: 0,
  },
  formLabelText: {
    fontFamily: Fonts.type.acuminProBold,
    fontSize: Fonts.size.h9,
    color: '#222222',
  },
  appVersion:{
    fontFamily: Fonts.type.acuminProRegular,
    fontSize: 12,
    color: 'white',
  },
  titleSignIn: {
    fontFamily: Fonts.type.acuminProSemiBold,
    fontSize: 15,
    color: '#00ace6',
    marginBottom: 25
  },
  logoPantes: {
    position: 'absolute',
    top: 0,
    width: Scale(375),
    height: Scale(350)
  },
  chooseButton: {
    borderBottomColor: Colors.alertInfo,
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 30,
    flex: 1,
  },
  textUser: {
    fontFamily: Fonts.type.acuminProRegular,
    fontSize: 12,
    color: Colors.alertInfo,
  },
  buatAkun: {
    fontFamily: Fonts.type.azoSansRegular,
    color: Colors.textBlack,
    fontSize: 13
  },
  buatAkunBlue: {
    fontFamily: Fonts.type.azoSansRegular,
    color: '#00BFFF',
    fontSize: 13,
    marginLeft: 3
  }
})
