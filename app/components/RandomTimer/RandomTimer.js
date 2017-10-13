import React from 'react';
import { View, Text, TextInput, Button, Alert} from 'react-native';
import styles from './styles.js';
import TimerButton from './../TimerButton/TimerButton.js';
import TimerInput from './../TimerInput/TimerInput.js';
import MultiSliderInput from './../MultiSlider/MultiSlider.js';
import utils from './../../lib/utils.js';

import { Audio } from 'expo';

var soundObject = new Audio.Sound();

export default class RandomTimer extends React.Component {
	constructor(props) {
		super(props);
		const defaultMinTime = 60000 * 20;
		const defaultMaxTime = 60000 * 30;
		this.playbackInstance = null;

		//timer statuses: ['stopped', 'running', 'paused', 'finished']
		//stopped -> running -> paused -> running -> finished -> stopped
		//                        ^> stopped
		this.state = {
			minTime: defaultMinTime,
			maxTime: defaultMaxTime,
			randomTime: 0,
			timeLeft: 0,
			status: 'stopped'
		};

		setInterval(() => {
			if( this.state.status == 'running'){
				let newTimeLeft = this.state.timeLeft -= 1000;
				// let newTimeLeft = this.state.timeLeft -= 1000;
				this.setState(previousState => {
					return {
						timeLeft: newTimeLeft,
					};
				});
				if(this.state.timeLeft < 0){
					this.onTimerFinished();
				}
			}
		}, 1000);
	}

	async componentDidMount(){
		try {
		  await soundObject.loadAsync(require('../../assets/small_bell.mp3'));
		} catch (error) {
			// console.log(error);
		}
	}

	async onTimerFinished(){
		await soundObject.playAsync();
		Alert.alert('Message', 'Time is up!');
		this.setState({ status: 'finished'});
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
		const minTimeMinutes = this.state.minTime / (1000 * 60);
		const maxTimeMinutes = this.state.maxTime / (1000 * 60);
		const randomTimeMinutes = utils.msToHMS(this.state.randomTime);

		switch(this.state.status){
			case 'stopped':
				statusDescriptionText = `Start a timer for between ${minTimeMinutes} and ${maxTimeMinutes} minutes`;
				break;
			case 'paused':
			case 'running':
				statusDescriptionText = `Timer between ${minTimeMinutes} and ${maxTimeMinutes} minutes is ${this.state.status}.`;
				let timeElapsed = utils.msToHMS(this.state.randomTime - this.state.timeLeft);
				statusDescriptionText += `\n \n ${timeElapsed}`
				break;
			case 'finished':
				statusDescriptionText = `Times up! Time elapsed: ${randomTimeMinutes}`;
				break;
			default:
				statusDescriptionText = `Timer between ${minTimeMinutes} and ${maxTimeMinutes} minutes is ${this.state.status}.`;
				break;
		}

		return statusDescriptionText;
	}


	onSliderValuesChange(values){
		let minTimeInMS = values[0] * 1000 * 60;
		let maxTimeInMS = values[1] * 1000 * 60;
		this.setState({
			minTime: minTimeInMS,
			maxTime: maxTimeInMS,
		})
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

	onPressSecondaryButton (){
		this.setState({
			status: 'stopped'
		});
	}

	render () {

		return (
			<View style={styles.timerView} >
				<View style={styles.descriptionWrapper} >
					<Text style={styles.statusDescription}>{this.statusDescription()}</Text>
				</View>
				<View style={styles.sliderWrapper} >
					<MultiSliderInput
						onValuesChange = {this.onSliderValuesChange.bind(this)}
						timerState = {this.state.status}
					/>
				</View>
				<View style={styles.buttonWrapper}>
					<TimerButton
						timerState = {this.state.status}
						onButtonPress={this.onPressPrimaryButton.bind(this)}
					/>
					<TimerButton
						onButtonPress={this.onPressSecondaryButton.bind(this)}
						timerState = {this.state.status}
						isSecondaryButton
					/>
				</View>
				<Text>{this.state.minTime} - {this.state.maxTime}</Text>
				<Text>{this.state.timeLeft}</Text>
			</View>
		)
	}
}
