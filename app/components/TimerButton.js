import React from 'react';
import { Button} from 'react-native';

export default class TimerButton extends React.Component {
    primaryButtonText(){
    if(this.props.timerState == 'stopped') {
      return 'Start';
    } else if(this.props.timerState == 'running') {
      return 'Pause';
    } else if(this.props.timerState == 'finished') {
      return 'Reset';
    } else if(this.props.timerState == 'paused') {
      return 'Resume';
    }
  }

  renderPrimaryButton(){
    return (
      <Button
        title={this.primaryButtonText()}
        disabled = {this.props.timerState == 'running'}
        onPress={ this.props.onButtonPress }
      />
    )
  }
  renderSecondaryButton(){
    return (
      <Button
        title='secondary'
        onPress={ this.props.onButtonPress }
      />
    )
  }

  render() {
    if(this.props.isSecondaryButton){
      return this.renderSecondaryButton();
    } else {
      return this.renderPrimaryButton();
    }
  }
}


