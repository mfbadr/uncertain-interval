import React from 'react';
import { Button, Alert, StyleSheet, Text, View, Image, Picker, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';
import RandomTimer from './app/components/RandomTimer/RandomTimer.js';
import commonStyles from './app/config/common_styles.js'
/***
TODO:
 - AccessibiltyLabels
***/



export default class RandomTimerApp extends React.Component {
	render() {
		return (
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View style={styles.container}>
					<Text style={styles.headline}>Uncertain Interval</Text>
					<RandomTimer/>
					<Text>contact info will go here</Text>

				</View>
			</TouchableWithoutFeedback>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: commonStyles.colors.altBackgroundColor,
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	headline: {
		textAlign: 'center',
		color: '#FFF',
		marginTop: 30,
		fontSize: 30,
	},
	text: {
		color: 'blue',
		fontSize: 30,
	}
});
