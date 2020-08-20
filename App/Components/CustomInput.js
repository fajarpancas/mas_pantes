/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Fonts, Colors } from '../Themes'
import Styles from './Styles/InputStyles'


export class CustomInput extends Component {

  state = {
      hidePassword: true
  }

  showPassword = () => {
      this.setState({ hidePassword: !this.state.hidePassword })
  }

  btnToggleShowPassword(){
    const icon = this.state.hidePassword ? 'visibility-off' : 'visibility'
    return (
      <TouchableOpacity
          style={Styles.btnToggleShowPassword}
          onPress={this.showPassword}
      >
          <Icon name={icon} size={20} color={Colors.warm_grey}/>
        </TouchableOpacity>
    )
  }

  render(){
      const showError = !!(this.props.error && this.props.error.length > 0);
      return (
        <View style={Styles.container}>
          {
            this.props.renderTitle
            ? this.props.renderTitle()
            : null
          }
          {
            this.props.label
            ? <Text style={this.props.styleTitle}>
                {this.props.title}
                {
                  this.props.required
                  ? <Text style={Styles.textRequired}> *</Text>
                  : null
                }
              </Text>
            : null
          }
          {this.props.desc ? <Text style={this.props.styleDesc}>{this.props.desc}</Text> : null}
          <View style={Styles.input} >
            { this.props.renderLeft ? this.props.renderLeft() : null }
            <TextInput
              multiline={this.props.multiline}
              placeholder={this.props.placeholder}
              placeholderTextColor={this.props.placeholderTextColor}
              secureTextEntry={(this.props.secureTextEntry && this.state.hidePassword)}
              name={this.props.name}
              value={
                Number.isInteger(this.props.value) ? this.props.value.toString() : this.props.value
              }
              editable={this.props.editable}
              keyboardType={this.props.keyboardType}
              returnKeyType={this.props.returnKeyType}
              onChangeText={text => {
                if (text != null) {
                  this.props.setFieldValue(this.props.name, text);
                }
                this.props.setFieldTouched(this.props.name, true);
              }}
              autoCapitalize={this.props.autoCapitalize}
              style={[Styles.inputText, this.props.styleInputText]}
            />
            { this.props.renderRight ? this.props.renderRight() : null }
            {
                this.props.toggleShowPassword
                ? this.btnToggleShowPassword()
                : null
            }

          </View>
          {
            showError
            ? <Text style={Styles.textError}>{this.props.error}</Text>
            : <Text style={Styles.textError}></Text>
          }
        </View>
      )
  }
};


CustomInput.defaultProps = {
  label: false,
  toggleShowPassword: false,
  title: '',
  name: '',
  value: '',
  error: '',
  placeholder: '',
  required: false,
  secureTextEntry: false,
  setFieldValue: () => {},
  setFieldTouched: () => {},
  editable: true,
  returnKeyType: 'done',
  keyboardType: 'default',
  autoCapitalize: 'sentences',
  labelColor: '#FFF5',
  textColor: '#000',
  fontFamily: Fonts.type.regular,
  styleInput: Styles.input,
  styleInputText: {},
  styleTitle: Styles.title,
  styleDesc: Styles.desc,
  multiline: false,
  placeholderTextColor: Colors.warm_grey,
  renderLeft: null,
  renderRight: null,
  renderTitle: null
};

CustomInput.propTypes = {
  label: PropTypes.bool,
  title: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  secureTextEntry: PropTypes.bool,
  setFieldValue: PropTypes.func,
  setFieldTouched: PropTypes.func,
  editable: PropTypes.bool,
  returnKeyType: PropTypes.string,
  keyboardType: PropTypes.string,
  autoCapitalize: PropTypes.string,
  labelColor: PropTypes.string,
  textColor: PropTypes.string,
  fontFamily: PropTypes.string,
  styleInput: PropTypes.object,
  styleInputText: PropTypes.object,
  styleTitle: PropTypes.object,
  multiline: PropTypes.bool,
  placeholderTextColor: PropTypes.string,
  renderLeft: PropTypes.func,
  renderRight: PropTypes.func,
  renderTitle: PropTypes.func
};
