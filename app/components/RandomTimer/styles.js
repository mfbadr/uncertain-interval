import commonStyles from './../../config/common_styles.js'

const styles = {
  statusDescription: {
    color: '#FFF',
    width: '100%',
    fontSize: 22,
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
  descriptionWrapper: {
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-around',
    // textAlign: 'center'
    // height: '30%'
  },
  sliderWrapper: {},
  inputWrapper: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    height: '50%'
    // padding: '20%'
  },
  buttonWrapper: {
    // flex: 2, 
    flexDirection: 'row',
    justifyContent: 'space-around',

    width: '100%',
    // padding: '20%'
  }
}

export default styles;