import React, { Component } from 'react'
import { TextInput, Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import { Fonts, Colors } from '../../Themes'
import styles from '../Styles/BerikanPenilaianScreenStyle'
import { Rating, AirbnbRating } from 'react-native-ratings';
import Icons from 'react-native-vector-icons/MaterialIcons'

const RATES = [
  { key: 1, description: 'Kurang Baik' },
  { key: 2, description: 'Cukup' },
  { key: 3, description: 'Baik' },
  { key: 4, description: 'Sangat Baik' },
  { key: 5, description: 'Luar Biasa' },
]

class BerikanPenilaianScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedStar: null,
      describe: ''
    }
  }

  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Berikan Penilaian',
    headerTitleStyle: {
      color: Colors.white,
      fontSize: 16,
      fontWeight: '600',
      fontFamily: Fonts.type.acuminProSemiBold,
      textTransform: 'uppercase',
    },
    headerStyle: {
      backgroundColor: '#ccb102',
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0
    }
  })

  onPressStar = (selectedStar) =>
    this.setState({ selectedStar })

  render() {
    const {
      selectedStar,
    } = this.state
    return (
      <View style={{ justifyContent: 'center', flex: 1, backgroundColor: 'white' }}>
        <View style={styles.rateContainer}>
          <Text style={styles.starDesc}>
            {selectedStar ? `"${selectedStar.description}"` : '"Penilaian"'}
          </Text>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row'
            }}>
            {RATES.map((item, index) => {
              const selected = selectedStar && selectedStar.key >= item.key ? true : false;
              return (
                <TouchableOpacity
                  onPress={() =>
                    this.onPressStar(item)}>
                  <Icons
                    key={index}
                    name={selected ?
                      "star" :
                      "star-border"}
                    color={selected ?
                      Colors.goldBasic :
                      "#999999"}
                    size={40}
                    style={styles.star} />
                </TouchableOpacity>
              )
            })}
          </View>
          <Text style={styles.maxlength}>{this.state.describe.length}/100</Text>
          <TextInput
            style={styles.input}
            placeholder={'Berikan kami masukkan'}
            multiline={true}
            maxLength={100}
            onChangeText={(text) => this.setState({ describe: text })}
          />
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BerikanPenilaianScreen)
