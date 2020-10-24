import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Fonts } from '../../Themes'
import Scale from '../../Transforms/Scale'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  profilWrapper: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    marginTop: 10,
    padding: 10,
    elevation: 1,
    paddingLeft: 15
  },
  namaSales: {
    fontSize: 14,
    color: Colors.textGrey,
    fontFamily: Fonts.type.acuminProRegular
  },
  namaToko: {
    fontSize: 14,
    color: Colors.textBlack,
    fontFamily: Fonts.type.acuminProMedium
  },
  sales: {
    fontFamily: Fonts.type.acuminProItalic
  },
  wrapper: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
    paddingRight: 15,
    borderBottomColor: Colors.borderGrey,
    borderBottomWidth: 1,
    paddingVertical: 10
  },
  textList: {
    fontFamily: Fonts.type.acuminProRegular,
    color: Colors.textBlack,
    flex: 1
  },
  copyright: {
    fontFamily: Fonts.type.acuminProRegular,
    color: Colors.textGrey,
    textAlign: 'center',
    fontSize: 12
  },
  logoutButton: {
    marginTop: 15,
    height: Scale(40),
    backgroundColor: Colors.white,
    justifyContent: 'center',
    elevation: 1
  },
  logoutText: {
    color: Colors.alertError,
    textAlign: 'center',
    fontFamily:Fonts.type.acuminProMedium
  }
})
