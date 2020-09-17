import React, { Component } from 'react'
import { View, Image, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Colors, Images, Fonts } from '../../../Themes'
import Scale from '../../../Transforms/Scale'
import styles from '../../Styles/AkunScreenStyle'
import Icons from 'react-native-vector-icons/MaterialIcons'
import CustomModalDelete from '../../../Components/CustomModalDelete'

const privacyInform = [
    {
        key: 1,
        title: 'Pelajari FAQ',
        navigation: 'PelajariFaqScreen'
    },
    {
        key: 2,
        title: 'Berikan Penilaian',
        navigation: 'BerikanPenilaianScreen'
    },
    {
        key: 3,
        title: 'Hubungi Kami',
        navigation: 'HubungiKamiScreen'
    },
    {
        key: 4,
        title: 'Kebijakan Privasi',
        navigation: 'KebijakanPrivasiScreen'
    }
]

class AkunScreen extends Component {
    modalLogout = undefined
    static navigationOptions = ({ navigation }) => ({
        headerTitle: 'Akun Saya',
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
        }
    }

    logout = () => {
        this.props.navigation.navigate('Auth')
    }

    renderList = ({ title, navigation }) => {
        return (
            <TouchableOpacity
                style={styles.wrapper}
                onPress={() => this.props.navigation.navigate(navigation)}>
                <Text style={styles.textList}>{title}</Text>
                <Icons name={'chevron-right'} size={25} color={Colors.goldBasic} />
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <View style={styles.profilWrapper}>
                        <Image
                            source={Images.DefaultAvatar}
                            style={{ width: Scale(70), height: Scale(70) }} />
                        <View style={{
                            flexDirection: 'column',
                            justifyContent: 'center',
                            marginLeft: 10
                        }}>
                            <Text style={styles.namaSales}>Akmal M Kristatnto
                                <Text style={styles.sales}></Text>
                            </Text>
                            <Text style={styles.namaToko}>Cabang Garage City Mall</Text>
                        </View>
                    </View>

                    <View style={{ marginTop: 15, backgroundColor: Colors.white }}>
                        {privacyInform.map(this.renderList)}
                    </View>

                    <TouchableOpacity
                        onPress={() => this.modalLogout.show()}
                        style={styles.logoutButton}>
                        <Text style={styles.logoutText}>KELUAR</Text>
                    </TouchableOpacity>

                    <View style={{ marginTop: 10 }}>
                        <Text style={styles.copyright}>© 2020 Toko Mas Pantes. All Rights Reserved.</Text>
                        <Text style={styles.copyright}>App Sales Section, App Version 1.0</Text>
                    </View>
                </View>
                <CustomModalDelete
                    title={'Keluar'}
                    confirmText={'Ya, Keluar'}
                    onConfirm={this.logout}
                    message={'Apakah anda yakin ingin keluar dari akun ini?'}
                    setRef={r => this.modalLogout = r}
                />
            </View >
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

export default connect(mapStateToProps, mapDispatchToProps)(AkunScreen)
