import React from 'react';
import { View, Text, TextInput, Button, Alert} from 'react-native';
import styles from './styles.js';
import TimerButton from './../TimerButton/TimerButton.js';
import TimerInput from './../TimerInput/TimerInput.js';
import prettyPrintTime from './../../lib/prettyPrintTime.js';

export default class RandomTimer extends React.Component {
	constructor(props) {
		super(props);
		//timer statuses: ['stopped', 'running', 'paused', 'finished']
		//stopped -> running -> paused -> running -> finished -> stopped
		//                        ^> stopped
		this.state = {
			minTime: 5,
			maxTime: 10000,
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
		// const minTimeMinutes = String(this.state.minTime / 60000);
		const minTimeMinutes = prettyPrintTime(this.state.minTime);
		// const maxTimeMinutes = String(this.state.maxTime / 60000);
		const maxTimeMinutes = prettyPrintTime(this.state.maxTime);
		// const randomTimeMinutes = String(this.state.randomTime / 60000);
		const randomTimeMinutes = prettyPrintTime(this.state.randomTime);
		switch(this.state.status){
			case 'stopped':
				statusDescriptionText = 'Start a time for between';
				break;
			case 'running':
				statusDescriptionText = 'Timer running for between ';
				break;
			case 'paused':
				statusDescriptionText = 'Timer paused between:';
				break;
			case 'finished':
				statusDescriptionText = 'Timer finished! Time elapsed: ' + randomTimeMinutes + '.';
				break;
			default:
				Alert.alert('err', 'err');
		}

		return statusDescriptionText;
	}

	onPressPrimaryButton(){
		if(!this.state.minTime && !this.state.maxTime){
			Alert.alert('Error', 'Pick a minumum and maxiumum time');
			return;
		} else if (this.state.minTime > this.state.maxTime){
			Alert.alert('Error', 'Max time must be more than min time');
			return;
		}
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
				this.setState({status: 'running'});
				break;
			case 'finished':
				this.setState({status: 'stopped'});
				break;
			default:
				Alert.alert('err', 'err');
		}
	}

	render () {
		return (
			<View style={styles.timerView} >
				<Text style={styles.statusDescription}>{this.statusDescription()}</Text>
				<View style={styles.inputWrapper}>
					<TimerInput
						onBlur = {(e)=> this.onTimeChanged({time:e.nativeEvent.text, isMinTime: true})}
						value = {this.state.minTime}
						timerState = {this.state.status}
					/>
					<Text> and </Text>
					<TimerInput
						onBlur = {(e)=> this.onTimeChanged({time:e.nativeEvent.text, isMinTime: false})}
						value = {this.state.maxTime}
						timerState = {this.state.status}
					/>
				</View>
				<View style={styles.buttonWrapper}>
					<TimerButton
						timerState = {this.state.status}
						onButtonPress={this.onPressPrimaryButton.bind(this)}
					/>
				</View>
					<TimerButton
						onButtonPress={this.onPressPrimaryButton.bind(this)}
						timerState = {this.state.status}
						isSecondaryButton
					/>
				<Text>{this.state.minTime} - {this.state.maxTime}</Text>
				<Text>{this.state.timeLeft}</Text>
			</View>
		)
	}
}
