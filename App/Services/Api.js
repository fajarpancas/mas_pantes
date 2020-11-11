// a library to wrap and simplify api calls
import apisauce from 'apisauce'

// our "constructor"
const create = (baseURL = 'http://pantesgold.motekarindo.com/') => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache'
    },
    // 10 second timeout...
    timeout: 10000
  })

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  const getRoot = () => api.get('')
  const getRate = () => api.get('rate_limit')
  const getUser = (username) => api.get('search/users', { q: username })

  const getListUser = () => api.get('/api/list-user')
  const cekUser = (param) => api.post('/api/get-list-user', param)
  const getListKurir = () => api.get('/api/list-kurir')
  const login = (param) => api.post('/api/login', param)
  const logout = () => api.post('/api/logout')
  const createOrder = (param) => api.post('/api/penjualan', param)
  const getBarang = (param) => api.post('/api/getbarang', param)
  const getListOrder = (param) => api.get('/api/get-list-order', param)
  const getListOrderProcess = (param) => api.post('/api/get-list-order-by-kurir', param)
  const getListOrderNextProcess = (param) => api.post('/api/get-list-order-kirim', param)
  const getListOrderFinish = (param) => api.post('/api/get-list-order-finish', param)
  const getSalesListOrder = (param) => api.post('/api/get-sales-list-order', param)
  const pickBarang = (param) => api.post('/api/pick-barang', param)
  const kirimBarang = (param) => api.post('/api/kirim-barang', param)
  const barangSampai = (param) => api.post('/api/barang-sampai', param)
  const uploadFotoBarang = (param) => api.post('/api/upload-foto-barang', param)
  const kurirSetor = (param) => api.post('/api/kurir-setor', param)
  const kurirSetorList = (param) => api.post('api/detail-setor-by-sales', param)
  const saveTokenFCM = (param) => api.post('api/save-token-fcm', param)
  const getLokasiKurir = (param) => api.post('api/push-notif', param)
  const cancelOrder = (param) => api.post('api/cancel-order', param)
  const postLokasiKurir = (param) => api.post('api/save-lokasi-tracking', param)
  const changeStatusKurir = (param) => api.post('api/status-kurir', param)
  const getListToko = () => api.get('/api/list-toko')
  const getListOrderHistory = (param) => api.post('/api/get-order-user', param)
  const cancelPickUp = (param) => api.post('/api/cancel-pickup', param)
  const closeOrder = (param) => api.post('/api/close-order', param)
  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    getRoot,
    getRate,
    getUser,
    api,
    login,
    logout,
    createOrder,
    getListOrderProcess,
    getBarang,
    getListOrder,
    getListUser,
    getListKurir,
    getListOrderNextProcess,
    getListOrderFinish,
    pickBarang,
    kirimBarang,
    barangSampai,
    getSalesListOrder,
    uploadFotoBarang,
    kurirSetor,
    kurirSetorList,
    cekUser,
    saveTokenFCM,
    getLokasiKurir,
    postLokasiKurir,
    getListToko,
    cancelOrder,
    changeStatusKurir,
    getListOrderHistory,
    cancelPickUp,
    closeOrder
  }
}

// let's return back our create method as the default.
export default {
  create
}
