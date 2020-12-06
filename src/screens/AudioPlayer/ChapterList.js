import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/Ionicons'
import {
  StyleSheet,
  Text,
  Pressable,
  View,
  ScrollView,
  Alert,
} from 'react-native';
import Sound from 'react-native-sound';
import {color} from '../../configs'
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor:"#f5f5f5"
  },
  scrollContainer: {},
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 30,

    textAlign: 'center',
    backgroundColor: 'rgba(240,240,240,1)',
  },
  button: {
    fontSize: 20,
    backgroundColor: 'rgba(220,220,220,1)',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(80,80,80,0.5)',
    overflow: 'hidden',
    padding: 7,
  },
  header: {
    textAlign: 'left',
  },
  feature: {
    flexDirection: 'row',
    padding: 10,
    alignSelf: 'stretch',
    alignItems: 'center',
    borderTopWidth: 0.5,
    borderTopColor: 'rgb(180,180,180)',
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgb(230,230,230)',
  },
});

const Button = ({title, onPress}) => (
  <Pressable android_ripple={{borderless:true,color:color.ripple}}style={{margin:5}} onPress={onPress}>
   <View style={{backgroundColor:color.ripple,borderRadius:15,padding:10}}>
    <Icon size={30} name="md-play" color={color.PRIMARY}/>
   </View>
  </Pressable>
);

const Header = ({children, style}) => (
  <Text style={[styles.header, style]}>{children}</Text>
);

const Feature = ({title, onPress, buttonLabel = 'PLAY', status}) => (
  <View style={styles.feature}>
    <Header style={{flex: 1,fontFamily:"Conforta"}}>{title}</Header>
    {status ? (
      <Text style={{padding: 5}}>{resultIcons[status] || ''}</Text>
    ) : null}
    <Button title={buttonLabel} onPress={onPress} />
  </View>
);

const resultIcons = {
  '': '',
  pending: '?',
  playing: '\u25B6',
  win: '\u2713',
  fail: '\u274C',
};

const audioTests = [
  {
    title: 'mp3 remote download',
    url:
      'https://api.twilio.com/2010-04-01/Accounts/AC59f045f6bbe657c72a2bfbdf7736b5cd/Recordings/RE8d57ef4c537183172c3c819fcbff6b66.mp3',
  },
  {
    title: "mp3 remote - file doesn't exist",
    url:
      'https://raw.githubusercontent.com/zmxv/react-native-sound-demo/master/file-not-here.mp3',
  },
  {
    title: 'aac remote download',
    url:
      'https://raw.githubusercontent.com/zmxv/react-native-sound-demo/master/pew2.aac',
  },
  {
    title: 'wav remote download',
    url:
      'https://raw.githubusercontent.com/zmxv/react-native-sound-demo/master/frog.wav',
  },
  {
    title: 'wav remote download',
    url:
      'https://raw.githubusercontent.com/zmxv/react-native-sound-demo/master/frog.wav',
  },
  {
    title: 'wav remote download',
    url:
      'https://raw.githubusercontent.com/zmxv/react-native-sound-demo/master/frog.wav',
  },
];

function setTestState(testInfo, component, status) {
  component.setState({
    tests: {...component.state.tests, [testInfo.title]: status},
  });
}

/**
 * Generic play function for majority of tests
 */
function playSound(testInfo, component) {
  setTestState(testInfo, component, 'pending');

  const callback = (error, sound) => {
    if (error) {
      Alert.alert('error', error.message);
      setTestState(testInfo, component, 'fail');
      return;
    }
    setTestState(testInfo, component, 'playing');

    // Run optional pre-play callback
    testInfo.onPrepared && testInfo.onPrepared(sound, component);
    sound.play(() => {
      // Success counts as getting to the end
      setTestState(testInfo, component, 'win');
      // Release when it's done so we're not using up resources
      sound.release();
    });
  };

  // If the audio is a 'require' then the second parameter must be the callback.
  if (testInfo.isRequire) {
    const sound = new Sound(testInfo.url, (error) => callback(error, sound));
  } else {
    const sound = new Sound(testInfo.url, testInfo.basePath, (error) =>
      callback(error, sound),
    );
  }
}

class MainView extends Component {
  constructor(props) {
    super(props);

    Sound.setCategory('Playback', true); // true = mixWithOthers

    // Special case for stopping
    this.stopSoundLooped = () => {
      if (!this.state.loopingSound) {
        return;
      }

      this.state.loopingSound.stop().release();
      this.setState({
        loopingSound: null,
        tests: {...this.state.tests, ['mp3 in bundle (looped)']: 'win'},
      });
    };

    this.state = {
      loopingSound: undefined,
      tests: {},
    };
  }

  render() {
    return (
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.scrollContainer}>
          {audioTests.map((testInfo,i) => {
            return (
              <Feature
                status={this.state.tests[testInfo.title]}
                key={i}
                title={testInfo.title}
                onPress={() => {
                  return playSound(testInfo, this);
                }}
              />
            );
          })}
          <Feature
            title="mp3 in bundle (looped)"
            buttonLabel={'STOP'}
            onPress={this.stopSoundLooped}
          />
        </ScrollView>
      
    );
  }
}

export default MainView;
