import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Fonts } from '../../Themes/'
import Scale from '../../Transforms/Scale'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  hiText: {
    fontFamily: Fonts.type.acuminProRegular,
    fontSize: 14,
    color: Colors.white,
  },
  usernameText: {
    fontFamily: Fonts.type.acuminProBold,
    fontSize: 18,
    color: Colors.white
  },
  headerLeft: {
    position: 'absolute',
    left: 20,
    bottom: 0
  },
  backgroundTop: {
    backgroundColor: '#ccb102',
    height: Scale(80)
  },
  infoPointWrapper: {
    backgroundColor: Colors.white,
    height: Scale(80),
    width: Scale(335),
    alignSelf: 'center',
    position: 'absolute',
    top: 40,
    elevation: 1
  },
  notificationWrapper: {
    justifyContent: 'center',
    backgroundColor: 'red',
    width: Scale(16),
    height: Scale(16),
    borderRadius: 16,
    position: 'absolute',
    zIndex: 1,
    right: -3,
    top: -5
  },
  notificationTotal: {
    fontSize: 9,
    fontFamily: Fonts.type.acuminProRegular,
    color: Colors.white,
    textAlign: 'center'
  },
  numberText: {
    color: Colors.textBlack,
    fontFamily: Fonts.type.acuminProBold,
    fontSize: 16,
    marginLeft: 6
  },
  pointText: {
    fontFamily: Fonts.type.acuminProRegular,
    fontSize: 13,
    color: Colors.textBlack,
  },
  tukarPointText: {
    color: '#63ccc5',
    fontFamily: Fonts.type.acuminProBold,
    fontSize: 13
  },
  gambarStyle: {
    width: Scale(340),
  },
  listBeritaWrapper: {
    width: Scale(340),
    alignSelf: 'center',
    marginBottom: 20
  },
  listText:{
    fontFamily: Fonts.type.acuminProSemiBold,
    fontSize: 14,
    color: Colors.textBlack,
    lineHeight: 18,
    marginTop: 3
  }
})
