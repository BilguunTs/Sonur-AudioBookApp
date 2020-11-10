import React from 'react';
import {View, Text, TouchableOpacity, Platform, Alert} from 'react-native';
import Slider from '@react-native-community/slider';
import Sound from 'react-native-sound';
import Icon from 'react-native-vector-icons/AntDesign';
import FluidButton from './FluidPlayButton';
import {iOSUIKit} from 'react-native-typography';
import Header from './Header'
export default class PlayerScreen extends React.Component {
  static navigationOptions = (props) => ({
    title: props.navigation.state.params.title,
  });

  constructor() {
    super();
    this.state = {
      playState: 'paused', //playing, paused
      playSeconds: 0,
      duration: 0,
    };
    this.sliderEditing = false;
  }

  componentDidMount() {
   // this.play();

    this.timeout = setInterval(() => {
      if (
        this.sound &&
        this.sound.isLoaded() &&
        this.state.playState == 'playing' &&
        !this.sliderEditing
      ) {
        this.sound.getCurrentTime((seconds, isPlaying) => {
          this.setState({playSeconds: seconds});
        });
      }
    }, 100);
  }
  componentWillUnmount() {
    if (this.sound) {
      this.sound.release();
      this.sound = null;
    }
    if (this.timeout) {
      clearInterval(this.timeout);
    }
  }

  onSliderEditStart = () => {
    this.sliderEditing = true;
  };
  onSliderEditEnd = () => {
    this.sliderEditing = false;
  };
  onSliderEditing = (value) => {
    if (this.sound) {
      this.sound.setCurrentTime(value);
      this.setState({playSeconds: value});
    }
  };

  play = async () => {
    if (this.sound) {
      this.sound.play(this.playComplete);
      this.setState({playState: 'playing'});
    } else {
      const filepath = this.props.filename || 'testaudio.mp3';
      this.sound = new Sound(filepath, Sound.MAIN_BUNDLE, (error) => {
        if (error) {
          console.log('failed to load the sound', error);
          Alert.alert('Notice', 'audio file error. (Error code : 1)');
          this.setState({playState: 'paused'});
        } else {
          this.setState({
            playState: 'playing',
            duration: this.sound.getDuration(),
          });
          this.sound.play(this.playComplete);
        }
      });
    }
  };
  playComplete = (success) => {
    if (this.sound) {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
        Alert.alert('Notice', 'audio file error. (Error code : 2)');
      }
      this.setState({playState: 'paused', playSeconds: 0});
      this.sound.setCurrentTime(0);
    }
  };

  pause = () => {
    if (this.sound) {
      this.sound.pause();
    }

    this.setState({playState: 'paused'});
  };

  jumpPrev15Seconds = () => {
    this.jumpSeconds(-15);
  };
  jumpNext15Seconds = () => {
    this.jumpSeconds(15);
  };
  jumpSeconds = (secsDelta) => {
    if (this.sound) {
      this.sound.getCurrentTime((secs, isPlaying) => {
        let nextSecs = secs + secsDelta;
        if (nextSecs < 0) nextSecs = 0;
        else if (nextSecs > this.state.duration) nextSecs = this.state.duration;
        this.sound.setCurrentTime(nextSecs);
        this.setState({playSeconds: nextSecs});
      });
    }
  };

  getAudioTimeString(seconds) {
    const h = parseInt(seconds / (60 * 60));
    const m = parseInt((seconds % (60 * 60)) / 60);
    const s = parseInt(seconds % 60);
    if (h === 0) {
      return (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s);
    }
    return (
      (h < 10 ? '0' + h : h) +
      ':' +
      (m < 10 ? '0' + m : m) +
      ':' +
      (s < 10 ? '0' + s : s)
    );
  }
  handleAction = () => {
    if (this.state.playState === 'playing') {
      this.pause();
    } else {
      this.play();
    }
  };
  render() {
    const currentTimeString = this.getAudioTimeString(this.state.playSeconds);
    const durationString = this.getAudioTimeString(this.state.duration);
  
    return (
      <View
        style={{
          flex: 1,
          width: '100%',
          justifyContent: 'center',
          backgroundColor: 'white',
        }}>
         <Header/>
         <Text style={[iOSUIKit.title3Object,{color: '#333', alignSelf: 'center'}]}>
          {currentTimeString}/{durationString}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginVertical: 15,
          }}>
          <TouchableOpacity
            onPress={this.jumpPrev15Seconds}
            style={{justifyContent: 'center'}}>
            <Icon name={'left'} size={30} style={{width: 30, height: 30}} />
            <Text
              style={{
                position: 'absolute',
                alignSelf: 'center',
                marginTop: 1,
                color: '#333',
                fontSize: 12,
              }}>
              15
            </Text>
          </TouchableOpacity>
          
          <FluidButton
            playing={this.state.playState === 'playing'}
            onPress={this.handleAction.bind(this)}
          />
          <TouchableOpacity
            onPress={this.jumpNext15Seconds}
            style={{justifyContent: 'center'}}>
            <Icon name={'right'} size={30} style={{width: 30, height: 30}} />
            <Text
              style={{
                position: 'absolute',
                alignSelf: 'center',
                marginTop: 1,
                color: '#333',
                fontSize: 12,
              }}>
              15
            </Text>
          </TouchableOpacity>
        </View>
       
        <View
          style={{
            marginTop:35,
            marginHorizontal: 15,
            flexDirection: 'row',
            position: 'absolute',
            bottom: 120,
          }}>
          <Slider
            onTouchStart={this.onSliderEditStart}
            // onTouchMove={() => console.log('onTouchMove')}
            onTouchEnd={this.onSliderEditEnd}
            // onTouchEndCapture={() => console.log('onTouchEndCapture')}
            // onTouchCancel={() => console.log('onTouchCancel')}
            onValueChange={this.onSliderEditing}
            value={this.state.playSeconds}
            maximumValue={this.state.duration}
            maximumTrackTintColor="gray"
            minimumTrackTintColor="#333"
            thumbTintColor="#333"
            style={{
              flex: 1,
              alignSelf: 'center',
              marginHorizontal: Platform.select({ios: 5}),
            }}
          />
        </View>
      </View>
    );
  }
}
