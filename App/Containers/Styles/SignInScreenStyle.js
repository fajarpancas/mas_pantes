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
  titleSignIn: {
    fontFamily: Fonts.type.acuminProSemiBold,
    fontSize: 15,
    color: '#00ace6',
    marginBottom: 25
  },
  logoPantes:{
    position: 'absolute',
    top: 0,
    width: Scale(375),
    height: Scale(350)
  }
})
