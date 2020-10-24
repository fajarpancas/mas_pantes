import { StyleSheet } from 'react-native'
import { Fonts, Metrics, Colors } from '../../Themes/'
import Scale from '../../Transforms/Scale'

export default StyleSheet.create({
  applicationView: {
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.background
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: Fonts.type.base,
    margin: Metrics.baseMargin
  },
  myImage: {
    width: 200,
    height: 200,
    alignSelf: 'center'
  },
  wrapper: {
    backgroundColor: 'white',
    width: Scale(300),
    alignSelf: 'center',
    borderRadius: 10,
    padding: 15,
    minHeight: Scale(250),
    justifyContent: 'center'
  },
  textGetLokasi:{
    marginTop: Scale(10),
    alignSelf: 'center',
    marginTop: Scale(45),
    fontFamily: Fonts.type.acuminProMedium,
    color: Colors.textBlack
  }
})
