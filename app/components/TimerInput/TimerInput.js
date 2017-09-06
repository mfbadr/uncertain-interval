import React from 'react';
import { Text, View, TextInput } from 'react-native';
import styles from './styles.js';
import utils from './../../lib/utils.js';

import {TextInputMask} from 'react-native-masked-text';


export default class TimerButton extends React.Component {
  constructor(props) {
    super(props);
  }

  onChangeText(text){
    console.log(text);
    var pad = "000000"

    var ans = pad.substring(text.length) + text;
    console.log(ans);
    // this.setState({
    //   displayValue: ans
    // });
  }

  renderStopped(){
    // return (
    //   <View>
    //     <TextInput
    //       style={styles.timeInput}
    //       keyboardType ='decimal-pad'
    //       placeholder = "00:00:00"
    //       default = "00:00:00"
    //       onBlur = {this.props.onBlur}
    //     />
    //   </View>
    // )
    return (
      <TextInput
        onBlur = {this.props.onBlur}
        style={styles.timeInput}
        ref={'myDateText'}
        type={'datetime'}
        onChangeText={this.onChangeText.bind(this)}
        keyboardType ='decimal-pad'

        />
      )
  }

  renderRunning(){
    return (
      <Text style={styles.timeDisplay}>
        {utils.msToHMS(this.props.value)}
      </Text>
    )
  }

  render () {
    switch(this.props.timerState){
      case 'stopped':
        return this.renderStopped();
        break;
      case 'paused':
        return this.renderRunning();
        break;
      case 'running':
        return this.renderRunning();
        break;
      case 'finished':
        return null;
        break;
    }


  }
}
