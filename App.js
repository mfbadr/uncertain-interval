import React from 'react';
import { Button, Alert, StyleSheet, Text, View, Image, Picker, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';

/***
TODO:
 - AccessibiltyLabels
***/

class RandomTimer extends React.Component {
	constructor(props) {
		super(props);
		//timer statuses: ['stopped', 'running', 'paused', 'finished']
		//stopped -> running -> paused -> running -> finished -> stopped
		//												^> stopped
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

	primaryButtonText(){
		if(this.state.status == 'stopped') {
			return 'Start';
		} else if(this.state.status == 'running') {
			return 'Stop';
		} else if(this.state.status == 'finished') {
			return 'Reset';
		} else if(this.state.status == 'paused') {
			return 'Resume';
		}
	}
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
		if(this.state.status == 'stopped'){
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
					<Button
						onPress={this.onPressPrimaryButton.bind(this)}
						title={this.primaryButtonText()}
					/>
					<Text>{this.state.timeLeft}</Text>


				</View>
			)
		}
	}
}

export default class RandomTimerApp extends React.Component {
	render() {
		return (
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View style={styles.container}>
					<Text style={styles.headline}>RandomTimer</Text>
					<RandomTimer/>
				</View>
			</TouchableWithoutFeedback>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		// justifyContent: 'center',
	},
	textInput: {
		borderColor: 'black',
		borderWidth: 1,
	},
	headline: {
		textAlign: 'center',
		marginTop: 30,
		fontSize: 30,
	},
	timer: {
		backgroundColor: 'pink',
	},
	text: {
		color: 'blue',
		fontSize: 30,
	}
});
