import React from 'react';
import { View, Text, TextInput, Button, Alert} from 'react-native';
import styles from './styles.js';
import TimerButton from './../TimerButton.js';

export default class RandomTimer extends React.Component {
  constructor(props) {
    super(props);
    //timer statuses: ['stopped', 'running', 'paused', 'finished']
    //stopped -> running -> paused -> running -> finished -> stopped
    //                        ^> stopped
    this.state = {
      startTime: 0,
      endTime: 6000,
      randomTime: 0,
      timeLeft: 0,
      status: 'stopped'
    };

    setInterval(() => {
      if( this.state.status == 'running'){
        let newTime = this.state.timeLeft -= 1000;
        this.setState(previousState => {
          return { timeLeft: newTime };
        });
        if(this.state.timeLeft < 0){
          Alert.alert('Message', 'Time is up!');
          this.setState({ status: 'finished'});
        }
      }
    }, 1000);
  }

  onTimeChanged({time, isStartTime}) {
    let timeInMs = parseFloat(time) * 60000;
    // Alert.alert('Time in MS', String(time));
    //TODO: check for start time > endtime
    if(isStartTime){
      this.setState({startTime: timeInMs})
    } else {
      this.setState({endTime: timeInMs})
    }
  }


  onPressSecondaryButton(){}
  onPressPrimaryButton(){
    // Alert.alert('foo', 'bar');
    // debugger;
    if(this.state.status == 'stopped') {
      let newInterval = Math.floor(Math.random() * (this.state.endTime - this.state.startTime)) + this.state.startTime;
      this.setState({
        status: 'running',
        timeLeft: newInterval,
        randomTime: newInterval,
      });
    } else if(this.state.status == 'running') {
      this.setState({status: 'paused'});
    } else if(this.state.status == 'finished') {
      this.setState({status: 'stopped'});
    } else if(this.state.status == 'paused') {
      this.setState({status: 'running'});
    }
  }

  render () {
      return (
        <View style={styles.timer} >
          <Text>Foo</Text>
          <View style={styles.inputWrapper}></View>
          <TextInput
            style={styles.textInput}
            keyboardType ='decimal-pad'
            onBlur = {(e)=> this.onTimeChanged({time:e.nativeEvent.text, isStartTime: true})}
            // value = {String(this.state.startTime/ 60000)}
          />
          <TextInput
            style={styles.textInput}
            keyboardType ='decimal-pad'
            onBlur = {(e)=> this.onTimeChanged({time:e.nativeEvent.text, isStartTime: false})}
            // value = {String(this.state.endTime / 60000)}
          />
          <Text>{this.state.startTime} - {this.state.endTime}</Text>
          <TimerButton
            onButtonPress={this.onPressPrimaryButton.bind(this)}
            isSecondaryButton
            timerState = {this.state.status}
          />
          <Text>{this.state.timeLeft}</Text>
        </View>
      )
  }
}
