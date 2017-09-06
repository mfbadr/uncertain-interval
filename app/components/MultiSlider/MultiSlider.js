import React from 'react';
import { Text, View, TextInput } from 'react-native';
import styles from './styles.js';
import utils from './../../lib/utils.js';

import MultiSlider from 'react-native-multi-slider';


export default class MultiSliderInput extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    if(this.props.timerState == 'stopped') {
      return (
          <MultiSlider
            values = {[20, 30]}
            min = {0}
            max = {60}
            step = {1}
            onValuesChange = {this.props.onValuesChange}
          />
        )
    } 

    return null;

  }
}
