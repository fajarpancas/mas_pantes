import React, { Component } from 'react'
import { Text, Linking, TouchableOpacity, StatusBar, View, Image, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import styles from '../Styles/LocationScreenStyle'
import MapView from 'react-native-maps'
import images from '../../Themes/Images'
import Scale from '../../Transforms/Scale'
import { Fonts, Colors } from '../../Themes'
import Icons from 'react-native-vector-icons/MaterialIcons'

const data = [
  {
    key: 1,
    tokoname: 'Toko Mas Pantes 1',
    alamat: 'Jalan Ciremai Raya No.12e, Jl. Ciremai Raya No.118, Kecapi, Kec. Harjamukti, Kota Cirebon, Jawa Barat 45142',
    telepon: 'Telepon : (0231) 484059',
    coordinate: {
      latitude: -6.7471,
      longitude: 108.5623
    }
  },
  {
    key: 2,
    tokoname: 'Toko Mas Pantes 2',
    alamat: 'Pegambiran, Lemahwungkuk, Cirebon City, West Java 45113',
    telepon: 'Telepon : (0231) 484059',
    coordinate: {
      latitude: -6.742809,
      longitude: 108.543973
    }
  },
  {
    key: 3,
    tokoname: 'Toko Mas Pantes 3',
    alamat: 'Jl. Kanggraksan No.118, Harjamukti, Kec. Harjamukti, Kota Cirebon, Jawa Barat 45143',
    telepon: 'Telepon : (0231) 484059',
    coordinate: {
      latitude: -6.731730,
      longitude: 108.556982
    }
  }
]

const location = [
  {
    key: 1,
    title: 'Toko Mas Pantes 1',
    coordinate: {
      latitude: -6.7471,
      longitude: 108.5623
    }
  },
  {
    key: 2,
    title: 'Toko Mas Pantes 2',
    coordinate: {
      latitude: -6.742809,
      longitude: 108.543973
    }
  },
  {
    key: 3,
    title: 'Toko Mas Pantes 3',
    coordinate: {
      latitude: -6.731730,
      longitude: 108.556982
    }
  }
]

class LocationScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      coordinatePoint: {
        latitude: -6.737999,
        longitude: 108.55269
      }
    }
  }

  static navigationOptions = ({ navigation }) => ({
    headerShown: false
  })

  onRegionChange(region) {
    this.setState({ region });
  }

  renderList = ({ tokoname, alamat, telepon, coordinate }) => {
    return (
      <TouchableOpacity
        onPress={() => this.redirectToMap(coordinate, alamat)}
        style={styles.cardListWrapper}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ justifyContent: 'center' }}>
            <Icons style={{ alignSelf: 'center' }} name="place" size={30} color="red" />
          </View>
          <View style={{ flexDirection: 'column', marginLeft: 10 }}>
            <Text style={styles.title}>{tokoname}</Text>
            <Text style={styles.alamat}>{alamat}</Text>
            <Text style={styles.alamat}>{telepon}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  renderMarker = ({ coordinate, title }) => {
    return (
      <MapView.Marker
        onPress={() => this.redirectToMap(coordinate, '')}
        coordinate={coordinate}>
        <View style={{ backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#ccb102', paddingVertical: 3, paddingRight: 8, paddingLeft: 5 }}>
            <Icons name='place' size={12} style={{ marginRight: 2 }} color={'white'} />
            <Text
              style={{
                fontFamily: Fonts.type.acuminProRegular,
                fontSize: 12,
                color: Colors.white
              }}>{title}</Text>
          </View>
          <Image
            source={images.gold}
            style={{
              height: Scale(30),
              width: Scale(50)
            }} />
        </View>
      </MapView.Marker>
    )
  }

  redirectToMap = (coordinate, locationName = '') => {
    const location = `${coordinate.latitude},${coordinate.longitude}`
    const url = `geo:${location}?center=${location}&q=${location}&z=16`
    Linking.openURL(url);
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
        <StatusBar translucent={false} hidden={false} barStyle="light-content" backgroundColor={'#ccb102'} />
        <View style={{
          height: Scale(400),
          width: null
        }}>
          <MapView
            style={styles.map}
            initialRegion={{
              ...this.state.coordinatePoint,
              latitudeDelta: 0.035001,
              longitudeDelta: 0.0001
            }}>
            {location.map(this.renderMarker)}
          </MapView>
        </View>

        <View style={{ flex: 1 }}>
          <View style={styles.infoLocWrapper}>
            <Text style={styles.infoLoc}>INFORMASI LOKASI</Text>
          </View>

          <ScrollView>
            {data.map(this.renderList)}
          </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(LocationScreen)
