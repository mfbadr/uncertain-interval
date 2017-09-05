import React from 'react';
import { Text, View, TextInput } from 'react-native';
import styles from './styles.js';
import utils from './../../lib/utils.js';

export default class TimerButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  renderStopped(){
    return (
      <View>
        <TextInput
          style={styles.timeInput}
          keyboardType ='decimal-pad'
          placeholder = "00:00:00"
          default = "00:00:00"
          onBlur = {this.props.onBlur}
        />
      </View>
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
