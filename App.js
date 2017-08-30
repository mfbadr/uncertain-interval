import React from 'react';
import { Button, Alert, StyleSheet, Text, View, Image, Picker, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';
import RandomTimer from './app/components/RandomTimer/RandomTimer.js'
/***
TODO:
 - AccessibiltyLabels
***/



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
	},
	headline: {
		textAlign: 'center',
		marginTop: 30,
		fontSize: 30,
	},
	text: {
		color: 'blue',
		fontSize: 30,
	}
});
