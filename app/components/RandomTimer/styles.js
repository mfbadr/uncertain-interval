import commonStyles from './../../config/common_styles.js'

const styles = {
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
    // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    height: '50%'
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