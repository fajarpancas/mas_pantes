import React, { Component } from 'react'
import { View, Text, FlatList, BackHandler } from 'react-native'
import { connect } from 'react-redux'
import { Fonts, Colors } from '../../../Themes'
import Icons from 'react-native-vector-icons/MaterialIcons'
import styles from '../../Styles/SalesScreenStyle'
import Scale from '../../../Transforms/Scale'
import moment from 'moment'

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

    }

    componentDidMount() {
        // this.getLocation()
    }

    componentWillUnmount() {
    }

    renderList = ({ index, item }) => {
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
                </View>
            </View>
        )
    }

    render() {
        const { lokasi, noPenjualan } = this.props
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.infoKurir}>Kurir sedang mengantar orderan dengan nomor penjualan {noPenjualan}</Text>
                <FlatList
                    data={lokasi}
                    renderItem={this.renderList}
                />
            </View>
        )
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