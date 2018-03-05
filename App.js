/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    TouchableOpacity,
} from 'react-native';

import DataRepository from './js/dao/DataRepository'
import { I18n } from './js/language/I18n'
import DeviceInfo from 'react-native-device-info'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {

    constructor(props){
        super(props);

        this.state = {
            localeLanguage: null,
        };


    }

    componentWillMount() {
        let locale = DeviceInfo.getDeviceLocale();

        new DataRepository().saveLocalRepository('localLanguage',locale, (error) => {
            if(error){
                alert(error);
            }
        });
    }


    refreshLanguage = (index) => {

        switch (index) {
            case 0:
                I18n.locale = 'en-US';
                break;
            case 1:
                I18n.locale = 'zh-Hans-US';
                break;
            case 2:
                I18n.locale = DeviceInfo.getDeviceLocale();
                break;
        }

        this.setState({
            localeLanguage: I18n.locale
        });

    };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
            {I18n.t('english')}
        </Text>
        <Text style={styles.welcome}>
            {I18n.t('chinese')}
        </Text>

          <TouchableOpacity style={styles.buttonMargin} onPress={() => this.refreshLanguage(0)}>
              <Text  style={styles.text}>
                  {I18n.t('changeToEnglish')}
              </Text>
          </TouchableOpacity>


          <TouchableOpacity style={styles.buttonMargin} onPress={() => this.refreshLanguage(1)}>
              <Text  style={styles.text}>
                  {I18n.t('changeToChinese')}
              </Text>
          </TouchableOpacity>


          <TouchableOpacity style={styles.buttonMargin} onPress={() => this.refreshLanguage(2)}>
              <Text  style={styles.text}>
                  {I18n.t('changeToSystem')}
              </Text>
          </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    buttonMargin: {
        marginVertical: 20,
        backgroundColor: '#FA8072'
    },
    text: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    }
});
