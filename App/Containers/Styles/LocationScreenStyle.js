import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Fonts } from '../../Themes/'
import Scale from '../../Transforms/Scale'

export default StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  infoLoc: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    fontFamily: Fonts.type.acuminProBold
  },
  infoLocWrapper: {
    height: Scale(40),
    justifyContent: 'center',
    backgroundColor: '#ccb102',
    marginBottom: 10
  },
  cardListWrapper: {
    marginBottom: 10,
    alignSelf: 'center',
    width: Scale(345),
    backgroundColor: Colors.white,
    elevation: 1,
    padding: 15
  },
  alamat: {
    width: Scale(280),
    fontFamily: Fonts.type.acuminProRegular,
    fontSize: 13,
    lineHeight: 18,
    color: Colors.textGrey
  },
  title: {
    fontFamily: Fonts.type.acuminProMedium,
    fontSize: 14,
    color: Colors.textBlack
  }
})
