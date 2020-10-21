import React, { Component } from 'react'
import { View, Text, TouchableOpacity, BackHandler } from 'react-native'
import { connect } from 'react-redux'
import NavigationServices from '../../Services/NavigationServices'
import { API_KEY } from '../../Data/Const'
import { Fonts, Colors } from '../../Themes'
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import SessionActions from '../../Redux/SessionRedux'

class KurirLocationTracking extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: 'Mode Pengiriman',
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

    postAddressToAPI = (fAddress) => {
        const { data } = this.props
        const { No_Penjualan } = data

        const param = {
            No_Penjualan,
            Address: fAddress
        }

        console.tron.error({ param })
    }

    getLocation = () => {
        Geocoder.init(API_KEY)
        Geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
                console.log(position)
                Geocoder.from(position.coords.latitude, position.coords.longitude)
                    .then(json => {
                        console.log(json);
                        var addressComponent = json.results[0].address_components;
                        let fullAddress = ''
                        for (let i = 0; i < addressComponent.length; i++) {
                            if (i < addressComponent.length - 1) {
                                fullAddress += `${addressComponent[i].long_name}, `
                            } else {
                                fullAddress += `${addressComponent[i].long_name}.`
                            }
                        }
                        this.postAddressToAPI(fullAddress)
                    })
                    .catch(error => console.warn(error));
            },
            (error) => {
                console.log(error.code, error.message);
            },
            {
                enableHighAccuracy: false,
                timeout: 10000,
                maximumAge: 100000
            }
        );
    }

    componentWillUnmount() {
        this.backHandler.remove()
    }

    toDetail = async () => {
        this.backHandler.remove()
        const { data } = this.props
        NavigationServices.navigate('DetailScreen', { data: { ...data, viewOnly: false } })
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Text>HomeKurirScreen</Text>
                <TouchableOpacity onPress={this.toDetail}>
                    <Text>To detail</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const mapStateToProps = (state, props) => {
    const data = props.navigation.getParam('data')
    console.tron.error({ data })
    return {
        data,
        indexing: state.session.indexing
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        upIndexing: () => dispatch(SessionActions.upIndexing())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(KurirLocationTracking)