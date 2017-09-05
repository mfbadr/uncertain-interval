import commonStyles from './../../config/common_styles.js'

const styles = {
  textInput: {
    borderColor: commonStyles.colors.secondaryButtonColor,
    backgroundColor: commonStyles.colors.primaryButtonColor,
    borderWidth: 3,
    borderRadius: 4,
    textAlign: 'center',
    width: 50,
    height: 50,
  },
  statusDescription: {
    color: '#FFF',
    fontSize: 26,
    textAlign: 'center'
  },
  timerView: {
    backgroundColor: commonStyles.colors.altBackgroundColor,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '80%',
    width: '100%',
    padding: '5%'
  },
  inputWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    // padding: '20%'
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    // padding: '20%'
  }
}

export default styles;