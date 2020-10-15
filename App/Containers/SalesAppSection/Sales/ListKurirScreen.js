import React, { Component } from 'react'
import { View, Text, ScrollView, Alert, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Method } from 'react-native-awesome-component';
import styles from '../../Styles/SalesScreenStyle'
import Icons from 'react-native-vector-icons/MaterialIcons'
import { Colors } from '../../../Themes';
import Scale from '../../../Transforms/Scale';
import HeaderMasPantes from '../../../Components/HeaderMasPantes'
import OrderActions from '../../../Redux/OrderRedux'
import { CustomFlatList } from '../../../Components'

class ListKurirScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        header: null
    })

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {
        this.onRefresh()
    }

    onRefresh = () => {
        const { kurirSetorListRequest, user } = this.props
        if (user) {
            const params = {
                page: 1,
                Id_Sales: user.Id_Sales
            }
            kurirSetorListRequest(params)
        }
    }


    renderTableHeader = () => {
        return (
            <View style={styles.headerTable}>
                <View style={styles.borderTableNo}>
                    <Text style={styles.valueTable}>No.</Text>
                </View>
                <View style={styles.borderTableNamaBarang}>
                    <Text style={styles.valueTable}>No Order</Text>
                </View>
                <View style={styles.borderTableHarga}>
                    <Text style={styles.valueTable}>Nama Cust</Text>
                </View>
                <View style={styles.borderTableFoto}>
                    <Text style={styles.valueTable}>Nilai Order</Text>
                </View>
                <View style={styles.borderTableFoto}>
                    <Text style={styles.valueTable}>Ongkir</Text>
                </View>
                <View style={styles.borderTableFoto}>
                    <Text style={styles.valueTable}>Jumlah</Text>
                </View>
                <View style={styles.borderTableFoto}>
                    <Text style={styles.valueTable}>Status</Text>
                </View>
                <View style={styles.borderTableFoto}>
                    <Text style={styles.valueTable}>Tgl. Setor</Text>
                </View>
            </View>
        )
    }

    renderTableTotal = (total) => {
        return (
            <View style={styles.headerTable}>
                <View style={styles.borderTableTotal}>
                    <Text style={styles.valueTable}>Total</Text>
                </View>
                <View style={styles.borderTableTotalValue}>
                    <Text style={styles.valueTable}>Rp. {total}</Text>
                </View>
                <View style={styles.borderTableTotalValue}>
                    <Text style={styles.valueTable}>Rp. {total}</Text>
                </View>
                <View style={styles.borderTableTotalValue}>
                    <Text style={styles.valueTable}>Rp. {total}</Text>
                </View>
                <View style={styles.borderNoValue} />
                <View style={styles.borderNoValue} />
            </View>
        )
    }

    renderTableValue = ({ No_Penjualan, Tgl_Penjualan, Nama_Customer, Status, Nilai_Bayar, Ongkos_Kirim }) => {
        return (
            <View style={styles.headerTable}>
                <View style={styles.borderTableNoValue}>
                    <Text style={styles.valueTableFill}>1</Text>
                </View>
                <View style={styles.borderTableNamaBarangValue}>
                    <Text style={styles.valueTableFill}>{No_Penjualan}</Text>
                </View>
                <View style={styles.borderTableHargaValue}>
                    <Text style={styles.valueTableFill}>{Nama_Customer}</Text>
                </View>
                <View style={styles.borderTableHargaValue}>
                    <Text style={styles.valueTableFill}>{Nilai_Bayar}</Text>
                </View>
                <View style={styles.borderTableHargaValue}>
                    <Text style={styles.valueTableFill}>{Ongkos_Kirim}</Text>
                </View>
                <View style={styles.borderTableHargaValue}>
                    <Text style={styles.valueTableFill}>{parseInt(Nilai_Bayar) + parseInt(Ongkos_Kirim)}</Text>
                </View>
                <View style={styles.borderTableHargaValue}>
                    <Text style={styles.valueTableFill}>{Status}</Text>
                </View>
                <View style={styles.borderTableHargaValue}>
                    <Text style={styles.valueTableFill}>{Tgl_Penjualan}</Text>
                </View>
            </View >
        )
    }

    renderEmpty = () => {
        return (
            <View style={{
                flex: 1,
                marginHorizontal: Scale(10),
                borderLeftColor: Colors.borderGrey,
                borderRightColor: Colors.borderGrey,
                borderLeftWidth: 1,
                borderRightWidth: 1,
            }}>
                <EmptyContent title={'Tidak Ada Data'} message={'Data barang masih kosong'} />
            </View>
        )
    }

    renderList = ({ item, index }) => {
        return (
            <View style={[styles.wrapperListKurir, {marginBottom: 10}]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.namaKurirText}>Kurir : </Text>
                    <Text style={styles.titleText}>{item.Nama_Kurir}</Text>
                </View>
                <ScrollView horizontal={true}>
                    <View style={{ marginTop: 10, paddingBottom: Scale(2) }}>
                        {this.renderTableHeader()}
                        {item.Order_Detail.length > 0 ? item.Order_Detail.map(this.renderTableValue) :
                            this.renderEmpty()}
                        {this.renderTableTotal('total')}
                    </View>
                </ScrollView>
            </View>
        )
    }

    render() {
        const { kurirSetorListData, kurirSetorList } = this.props
        return (
            <View style={{ flex: 1 }}>
                <HeaderMasPantes />
                <View style={{ marginTop: 10, flex: 1 }}>
                    <CustomFlatList
                        data={kurirSetorListData}
                        renderItem={this.renderList.bind(this)}
                        refreshing={kurirSetorList.fetching}
                        onRefresh={this.onRefresh}
                        error={false}
                        errorMessage={'Tidak ada data'}
                        emptyTitle={'Data Kosong'}
                        emptyMessage={'Belum ada order yang dibuat'}
                        onEndReached={() => { }}
                    />
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.session.userSession,
        kurirSetorList: state.order.kurirSetorList,
        kurirSetorListData: state.order.kurirSetorListData
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        kurirSetorListRequest: (param) => dispatch(OrderActions.kurirSetorListRequest(param))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListKurirScreen)
