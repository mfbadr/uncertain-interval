import React from 'react';
import { Text, TouchableOpacity} from 'react-native';
import styles from './styles.js';

export default class TimerButton extends React.Component {

  getButtonText(){
    if(!this.props.isSecondaryButton){
      switch(this.props.timerState){
        case 'stopped':
          return 'Start';
          break;
        case 'running':
          return 'Pause';
          break;
        case 'paused':
          return 'Resume';
          break;
        case 'finished':
          return 'Reset';
          break;
        default:
          return 'Primary Button';
      }
    } else {
      // switch(this.props.timerState){
        // case 'stopped':
          // return 'secondary';
          // break;
        // case 'running':
          // return 'Pause';
          // break;
        // case 'paused':
          return 'Reset'
          // break;
        // case 'finished':
          // return 'Reset';
          // break;
        // default:
          // return 'Secondary Button';
      // }
    }
  }

  render() {
    let buttonText = this.getButtonText();
    if( this.props.isSecondaryButton) {
      if(this.props.timerState !== 'stopped' && this.props.timerState !== 'finished'){
        return (
           <TouchableOpacity
          style={styles.button}
          onPress={ this.props.onButtonPress }
        >
          <Text style={styles.text}>
            {buttonText}
          </Text>
          </TouchableOpacity>
        )
      }
      return null;
    }

    return (
       <TouchableOpacity
          style={styles.button}
          onPress={ this.props.onButtonPress }
        >
          <Text style={styles.text}>
            {buttonText}
          </Text>
      </TouchableOpacity>
      )
  }
}


