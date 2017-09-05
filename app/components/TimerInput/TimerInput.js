import React from 'react';
import { Text, View, TextInput } from 'react-native';
import styles from './styles.js';

export default class TimerButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  renderStopped(){
    return (
      <View>
        <TextInput
          style={styles.textInput}
          keyboardType ='decimal-pad'
          onBlur = {this.props.onBlur}
        />
        <Text>
          {this.props.value}
        </Text>
      </View>
    )
  }

  renderRunning(){
    return (
      <Text>
        {this.props.value}
      </Text>
    )
  }

  render () {
    switch(this.props.timerState){
      case 'stopped':
        return this.renderStopped();
        break;
      case 'paused':
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
