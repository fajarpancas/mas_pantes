
import { Colors, Fonts } from '../../Themes'

const styles = {
  container: {
    marginBottom: 0
  },
  title: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textBlack,
    fontFamily: Fonts.style.acuminProBold
  },
  textRequired: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textRed,
    fontFamily: Fonts.style.acuminProBold
  },
  desc: {
    // paddingLeft: 10,
    paddingLeft: 5,
    fontSize: Fonts.size.extraSmall,
    fontFamily: Fonts.type.regular,
    color: Colors.darkBlue,
    fontWeight: '400',
    letterSpacing: 1,
  },
  input: {
    // height: 40,
    // margin: 5,
    // paddingVertical: Platform.OS == 'ios' ? 12 : 0,
    flex: 1,
    flexDirection: 'row',
    // marginVertical: 5,
    // paddingVertical: Platform.OS === 'ios' ? 5 : 0,
    borderBottomColor: Colors.very_light_pink,
    borderBottomWidth: 1,
    alignItems: 'center'
    // justifyContent: 'center'
  },
  inputText: {
    flex:1,
    fontSize: 14,
    color: Colors.textBlack,
    fontFamily: Fonts.style.acuminProRegular,
    // borderRadius: 10,
    // padding: 10,
    height: 40
  },
  textValue: {
    textAlign: 'left',
    fontSize: 14,
    fontFamily: Fonts.type.acuminProRegular,
    color: Colors.textBlack
  },
  textPlaceHolder: {
    textAlign: 'left',
    fontSize: 14,
    fontFamily: Fonts.type.acuminProRegular,
    color: Colors.warm_grey
  },
  textError: {
    textAlign: 'left',
    fontSize: 10,
    color: 'red',
    marginVertical: 5,
    fontFamily: Fonts.type.acuminProRegular,
  },
  btnToggleShowPassword: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    padding: 10,
    // borderLeftWidth: 1,
    // borderLeftColor: Colors.purple,
    justifyContent: 'center'
  }
}

export default styles
