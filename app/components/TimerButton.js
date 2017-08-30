import React from 'react';
import { Button} from 'react-native';

export default class TimerButton extends React.Component {
    primaryButtonText(){
    if(this.props.timerState == 'stopped') {
      return 'Start';
    } else if(this.props.timerState == 'running') {
      return 'Stop';
    } else if(this.props.timerState == 'finished') {
      return 'Reset';
    } else if(this.props.timerState == 'paused') {
      return 'Resume';
    }
  }

  render() {
    return (
      <Button
        title={this.primaryButtonText()}
        onPress={ this.props.onButtonPress }
      />
    )
  }
}


