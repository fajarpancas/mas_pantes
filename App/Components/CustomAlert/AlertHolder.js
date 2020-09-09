
export class AlertHolder {

  static Alert

  static setAlert(alert){
    // console.tron.log('setAlert ', alert)
    this.Alert = alert
  }

  static showAlert(action = () => {}){
    this.Alert.showModal(action)
  }

  static hideAlert(){
    this.Alert.hideModal()
  }

}
