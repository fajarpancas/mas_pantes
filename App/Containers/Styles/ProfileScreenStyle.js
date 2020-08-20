import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Fonts } from '../../Themes/'
import Scale from '../../Transforms/Scale'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  topHeaderWrapper: {
    backgroundColor: Colors.white,
    height: Scale(250),
    padding: 10
  },
  informWrapper: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    marginLeft: 15,
    paddingRight: 15,
    height: Scale(43),
    alignItems: 'center',
    borderBottomColor: '#e5e5e5',
    borderBottomWidth: 0.5
  },
  logoutBtn: {
    width: Scale(350),
    marginVertical: 20,
    backgroundColor: '#ff6666',
    borderRadius: 4,
    alignSelf: 'center',
    justifyContent: 'center',
    height: 40
  },
  logoutText: {
    textAlign: 'center',
    color: Colors.white,
    fontFamily: Fonts.type.acuminProBold,
    textTransform: 'uppercase'
  },
  modalWrapper: {
    width: Scale(340),
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 8
  },
  pointTitle: {
    flex: 1,
    fontSize: 14,
    marginLeft: 10,
    fontFamily: Fonts.type.acuminProRegular
  },
  pointValue: {
    fontFamily: Fonts.type.acuminProRegular,
    fontSize: 14,
    color: Colors.textBlack
  },
  informBottomWrapper: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    height: Scale(60),
    marginLeft: 15,
    paddingRight: 15,
    alignItems: 'center',
    borderBottomColor: '#e5e5e5',
    borderBottomWidth: 0.7
  },
  valueQr: {
    marginTop: 15,
    fontFamily: Fonts.type.acuminProRegular,
    fontSize: 14,
    color: Colors.textBlack,
    textAlign: 'center'
  }
})
