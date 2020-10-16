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
import { EmptyContent, CustomFlatList } from '../../../Components'
import moment from 'moment'

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
                <View style={styles.borderTableHargaNama}>
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

    renderTableTotal = (totalOngkir, totalNilai, totalJumlah) => {
        return (
            <View style={styles.headerTable}>
                <View style={styles.borderTableTotal}>
                    <Text style={styles.valueTable}>Total</Text>
                </View>
                <View style={styles.borderTableTotalValue}>
                    <Text style={styles.valueTable}>Rp. {totalNilai}</Text>
                </View>
                <View style={styles.borderTableTotalValue}>
                    <Text style={styles.valueTable}>Rp. {totalOngkir}</Text>
                </View>
                <View style={styles.borderTableTotalValue}>
                    <Text style={styles.valueTable}>Rp. {totalJumlah}</Text>
                </View>
                <View style={styles.borderNoValue} />
                <View style={styles.borderNoValue} />
            </View>
        )
    }

    renderTableValue = ({
        No_Penjualan,
        no,
        Total,
        Jam_Setor,
        Nama_Customer,
        Status,
        Nilai_Bayar,
        Ongkos_Kirim
    }) => {
        return (
            <View style={styles.headerTable}>
                <View style={styles.borderTableNoValue}>
                    <Text style={styles.valueTableFill}>{no}</Text>
                </View>
                <View style={styles.borderTableNamaBarangValue}>
                    <Text style={styles.valueTableFill}>{No_Penjualan}</Text>
                </View>
                <View style={styles.borderTableHargaValueNama}>
                    <Text style={styles.valueTableFill}>{Nama_Customer}</Text>
                </View>
                <View style={styles.borderTableHargaValue}>
                    <Text style={styles.valueTableFill}>Rp. {Nilai_Bayar}</Text>
                </View>
                <View style={styles.borderTableHargaValue}>
                    <Text style={styles.valueTableFill}>Rp. {Ongkos_Kirim}</Text>
                </View>
                <View style={styles.borderTableHargaValue}>
                    <Text style={styles.valueTableFill}>Rp. {Total}</Text>
                </View>
                <View style={styles.borderTableHargaValue}>
                    <Text style={styles.valueTableFill}>{Status === 1 ? 'Stor' : 'Belum Stor'}</Text>
                </View>
                <View style={styles.borderTableHargaValue}>
                    <Text style={styles.valueTableFill}>{Jam_Setor ? moment(Jam_Setor, 'YYYY-MM-DD hh:mm:ss').format('DD MMM YYYY') : '-'}</Text>
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
        let dataOrder = []
        let totalOngkir = 0
        let totalNilai = 0
        let totalJumlah = 0
        let totalSetor = 0
        let totalSaldo = 0

        for (let i = 0; i < item.Order_Detail.length; i++) {
            totalOngkir += parseInt(item.Order_Detail[i].Ongkos_Kirim)
            totalNilai += parseInt(item.Order_Detail[i].Nilai_Bayar)
            totalJumlah += parseInt(item.Order_Detail[i].Total)

            if(item.Order_Detail[i].Status === 1){
                totalSetor += parseInt(item.Order_Detail[i].Total)
            }else{
                totalSaldo += parseInt(item.Order_Detail[i].Total)
            }

            dataOrder.push({
                ...item.Order_Detail[i],
                no: i + 1
            })
        }

        return (
            <View style={[styles.wrapperListKurir, { marginBottom: 10 }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.namaKurirText}>Kurir : </Text>
                    <Text style={styles.titleText}>{item.Nama_Kurir}</Text>
                </View>
                <ScrollView horizontal={true}>
                    <View style={{ marginTop: 10, paddingBottom: Scale(2) }}>
                        {this.renderTableHeader()}
                        {dataOrder.length > 0 ? dataOrder.map(this.renderTableValue) :
                            this.renderEmpty()}
                        {this.renderTableTotal(totalOngkir, totalNilai, totalJumlah)}
                    </View>
                </ScrollView>

                <View style={{ marginTop: 20, marginBottom: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.namaKurirText2}>Total Order </Text>
                        <Text style={styles.titleTextTotal}>: Rp. {totalJumlah}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.namaKurirText2}>Setor </Text>
                        <Text style={styles.titleTextTotal}>: Rp. {totalSetor}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.namaKurirText2}>Saldo </Text>
                        <Text style={styles.titleTextTotal}>: Rp. {totalSaldo}</Text>
                    </View>
                </View>
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
