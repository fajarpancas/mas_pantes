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
  },
  profilWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.white,
    marginTop: 10,
    padding: 15,
    elevation: 1,
  },
  namaSales: {
    fontSize: 13,
    marginLeft: 3,
    color: Colors.textGrey,
    fontFamily: Fonts.type.acuminProRegular
  },
  namaToko: {
    fontSize: 13,
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
    fontFamily: Fonts.type.acuminProMedium
  },
  lihat: {
    fontFamily: Fonts.type.acuminProRegular,
    fontSize: 12,
    color: Colors.alertInfo,
    marginRight: 5
  },
  modalDeleteWrapper: {
    width: Scale(300),
    justifyContent: 'center',
    height: 'auto',
    paddingHorizontal: Scale(20),
    paddingVertical: Scale(40),
    backgroundColor: Colors.white,
    alignSelf: 'center',
    borderRadius: 10
  },
  qrValueText: {
    fontFamily: Fonts.type.acuminProMedium,
    color: Colors.textBlack,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 15
  }
})
