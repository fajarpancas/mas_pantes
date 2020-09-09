
import I18n from '../I18n';

type AlertType = 'info' | 'warn' | 'error' | 'success'

export type DropdownType = {
  alertWithType: (type: AlertType, title: string, message: string) => void
}

export class DropDownHolder {
  static dropDown: DropdownType
  static connectionStatus = true

  static setDropDown(dropDown: DropdownType) {
    this.dropDown = dropDown
  }

  static setConnectionStatus( status = true ){
      this.connectionStatus = status
  }

  static alert(type: AlertType, title: string, message: string, forceShow: false) {
    __DEV__ && console.tron.log('on alert ', type, title, message, this.connectionStatus)
    if(this.connectionStatus){
      this.dropDown.alertWithType(type, title, message)
    }else if(forceShow){
      this.dropDown.alertWithType(
          'error',
          I18n.t('connectionErrorTitle'),
          I18n.t('connectionErrorMessage')
      )
    }
  }
}

DropDownHolder.defaultProps = {
    connectionStatus: () => true
}
