import React, {PureComponent} from 'react'
import { View, TouchableOpacity, Text, Image } from 'react-native'
import Modal from 'react-native-modal'

import { Images, Fonts } from '../../Themes'
import I18n from '../../I18n'

export class ModalAlert extends PureComponent{

  state = {
    visible: false
  }

  action = () => {}

  showModal(action = () => {}){
    this.action = action
    this.setState({ visible: true })
    setTimeout(() => { action() }, 2000)
  }

  hideModal(){
    this.setState({ visible: false })
  }

  render(){
    return(
      <View>
        <Modal isVisible={this.state.visible}>
          <View style={styles.container}>
            <TouchableOpacity style={styles.content} onPress={this.action}>
              <Image source={Images.checkedLineIcon} style={styles.icon}/>
              <Text style={styles.textMessage}>{I18n.t('global.success')}</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    paddingVertical: 25,
    paddingHorizontal: 35,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,.5)',
    borderRadius: 10
  },
  icon: {
    height: 50,
    width: 50
  },
  textMessage: {
    fontFamily: Fonts.type.acuminProMedium,
    fontWeight: '400',
    fontSize: 14,
    color: '#FFF',
    marginTop: 10
  }
}
