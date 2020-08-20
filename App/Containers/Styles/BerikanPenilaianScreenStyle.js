import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Fonts } from '../../Themes/'
import Scale from '../../Transforms/Scale'

export default StyleSheet.create({
  star: {
    marginHorizontal: 3,
  },
  starDesc: {
    color: Colors.textBlack,
    fontSize: 16,
    fontFamily: Fonts.type.acuminProRegular,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: Scale(300),
    alignSelf: 'center',
    height: Scale(100),
    borderColor: '#DDDDDD',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    textAlignVertical: 'top',
    fontFamily: Fonts.type.acuminProRegular,
    fontSize: 14,
    color: Colors.textBlack,
    borderRadius: 5
  },
  maxlength:{
    marginTop: 20,
    width: Scale(295),
    alignSelf: 'center',
    textAlign: 'right',
    fontFamily: Fonts.type.acuminProRegular,
    fontSize: 12,
    color: Colors.textGrey
  }
})
