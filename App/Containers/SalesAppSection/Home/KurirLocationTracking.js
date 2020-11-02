import React, { Component } from 'react'
import { View, Text, FlatList, Linking, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Fonts, Colors } from '../../../Themes'
import Icons from 'react-native-vector-icons/MaterialIcons'
import styles from '../../Styles/SalesScreenStyle'
import Scale from '../../../Transforms/Scale'
import MapView from 'react-native-maps'
import moment from 'moment'
import { DropDownHolder } from '../../../Components'

class KurirLocationTracking extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: 'Tracking Posisi Kurir',
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

    constructor(props) {
        super(props)
        this.state = {
            region: {
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
        }
    }

    componentDidMount() {
        // this.getLocation()
    }

    componentWillUnmount() {
    }

    errorOpenMap = () => {
        DropDownHolder.alert('warn', 'Lihat di map gagal', 'latitude longitide tidak tersedia')
    }

    redirectToMap = (coordinate, locationName = '') => {
        const location = `${coordinate.latitude},${coordinate.longitude}`
        const url = `geo:${location}?center=${location}&q=${location}&z=16`
        Linking.openURL(url);
    }

    renderMarker = (coordinate, title) => {
        return (
            <MapView.Marker
                onPress={() => this.redirectToMap(coordinate, '')}
                coordinate={coordinate}>
                <View style={{ backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.alertSuccess, paddingVertical: 10, paddingHorizontal: 10 }}>
                        {/* <Icons name='place' size={12} style={{ marginRight: 2 }} color={'white'} /> */}
                        <Text
                            style={{
                                fontFamily: Fonts.type.acuminProRegular,
                                fontSize: 10,
                                width: Scale(100),
                                color: Colors.white
                            }}>{title}</Text>
                    </View>
                    <Icons
                        name="person-pin-circle"
                        size={100}
                        color={Colors.alertSuccess}
                    />
                </View>
            </MapView.Marker>
        )
    }

    renderList = ({ index, item }) => {
        let lat = '-'
        let long = '-'
        let coordinate = {

        }

        if (item.Lat && item.Long) {
            lat = item.Lat
            long = item.Long
            coordinate = {
                latitude: item.Lat,
                longitude: item.Long
            }
        }

        return (
            <View style={styles.wrapperLokasiTrack}>
                <View style={styles.wrapperBorder}>
                    <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                        <Icons name="place" size={25} color={'red'} style={{ marginRight: Scale(10) }} />
                        <Text style={styles.address}>{item.Detail_Address}</Text>
                    </View>
                    <View style={{ alignItems: 'center', flexDirection: 'row', marginTop: 4 }}>
                        <Icons name="schedule" size={15} color={'green'} style={{ marginLeft: Scale(5), marginRight: Scale(15) }} />
                        <Text style={styles.time}>{moment(item.Waktu, 'YYYY-MM-DD hh:mm:ss').format('DD MMMM YYYY, HH:mm')}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ marginVertical: 10, flex: 1 }}>
                            <Text style={styles.latlong}>Latitude: {lat}</Text>
                            <Text style={styles.latlong}>Longitude: {long}</Text>
                        </View>
                        {lat !== '-' && long !== '-'
                            ? <TouchableOpacity onPress={() => this.redirectToMap(coordinate, '')}>
                                <Icons name="subdirectory-arrow-right" size={Scale(30)} color={Colors.alertInfo} style={{ marginLeft: Scale(5), marginRight: Scale(15) }} />
                                <Text style={styles.time}>lihat di map</Text>
                            </TouchableOpacity> :
                            <TouchableOpacity onPress={this.errorOpenMap}>
                                <Icons name="subdirectory-arrow-right" size={Scale(30)} color={Colors.alertInfo} style={{ marginLeft: Scale(5), marginRight: Scale(15) }} />
                                <Text style={styles.time}>lihat di map</Text>
                            </TouchableOpacity>
                        }
                    </View>
                </View>
            </View>
        )
    }


    render() {
        const { lokasi, noPenjualan } = this.props
        let data = 'tidak ada data'
        let coordinate = undefined
        if (lokasi.length > 0) {
            coordinate = {
                latitude: parseFloat(lokasi[0].Lat),
                longitude: parseFloat(lokasi[0].Long)
            }
            data = `${lokasi[0].Detail_Address}`
        }

        console.tron.error({ coordinate })
        if (coordinate) {
            return (
                <View style={{ flex: 1 }}>
                    <View style={{ backgroundColor: Colors.white, zIndex: 1 }}>
                        <Text style={[styles.address, { marginTop: 10 }]}>Posisi terakhir :</Text>
                    </View>
                    <View style={{
                        height: Scale(350),
                        width: null
                    }}>
                        <MapView
                            style={styles.map}
                            initialRegion={{
                                ...coordinate,
                                latitudeDelta: 0.035001,
                                longitudeDelta: 0.0001
                            }}>
                            {this.renderMarker(coordinate, data)}
                        </MapView>
                    </View>

                    <View style={{ flex: 1, backgroundColor: 'white' }}>
                        <FlatList
                            data={lokasi}
                            renderItem={this.renderList}
                        />
                    </View>
                </View>
            )
        } else {
            <View style={{ justifyContent: 'center', flex: 1 }}>
                <Text>Loading</Text>
            </View>
        }
    }
}

const mapStateToProps = (state, props) => {
    const lokasi = state.tracking.lokasiData
    const noPenjualan = state.tracking.noPenjualanTracking
    return {
        lokasi,
        noPenjualan
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(KurirLocationTracking)