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
			minTime: 0,
			maxTime: 6000,
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

	onTimeChanged({time, isMinTime}) {
		let timeInMs = parseFloat(time) * 60000;
		// Alert.alert('Time in MS', String(time));
		//TODO: check for start time > maxTime
		if(isMinTime){
			this.setState({minTime: timeInMs})
		} else {
			this.setState({maxTime: timeInMs})
		}
	}

	statusDescription(){
		var statusDescriptionText;
		const minTimeMinutes = String(this.state.minTime / 60000);
		const maxTimeMinutes = String(this.state.maxTime / 60000);
		const randomTimeMinutes = String(this.state.maxTime / 60000);
		switch(this.state.status){
			case 'stopped':
 				statusDescriptionText = 'Select a minumum and maxiumum time'
				break;
			case 'running':
 				statusDescriptionText = 'Timer running for between ' + minTimeMinutes + 'minutes and' + maxTimeMinutes + ' minutes.';
				break;
			case 'paused':
 				statusDescriptionText = 'Timer paused';
				break;
			case 'finished':
 				statusDescriptionText = 'Timer finished! Time elapsed: ' + randomTimeMinutes;
				break;
			default:
				Alert.alert('err', 'err');
		}

		return statusDescriptionText;
	}

	onPressPrimaryButton(){
		switch(this.state.status){
			case 'stopped':
				let newInterval = Math.floor(Math.random() * (this.state.maxTime - this.state.minTime)) + this.state.minTime;
				this.setState({
					status: 'running',
					timeLeft: newInterval,
					randomTime: newInterval,
				});
				break;
			case 'running':
				this.setState({status: 'paused'});
				break;
			case 'paused':
				this.setState({status: 'stopped'});
				break;
			case 'finished':
				this.setState({status: 'running'});
				break;
			default:
				Alert.alert('err', 'err');
		}
	}

	render () {
		return (
			<View style={styles.timerView} >
				<Text>{this.statusDescription()}</Text>
				<View style={styles.inputWrapper}></View>
				<TextInput
					style={styles.textInput}
					keyboardType ='decimal-pad'
					onBlur = {(e)=> this.onTimeChanged({time:e.nativeEvent.text, isMinTime: true})}
					value = {String(this.state.minTime/ 60000)}
				/>
				<TextInput
					style={styles.textInput}
					keyboardType ='decimal-pad'
					onBlur = {(e)=> this.onTimeChanged({time:e.nativeEvent.text, isMinTime: false})}
					value = {String(this.state.maxTime / 60000)}
				/>
				<Text>{this.state.minTime} - {this.state.maxTime}</Text>
				<TimerButton
					onButtonPress={this.onPressPrimaryButton.bind(this)}
					timerState = {this.state.status}
				/>
				<Text>{this.state.timeLeft}</Text>
			</View>
		)
	}
}
