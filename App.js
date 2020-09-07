import 'react-native-gesture-handler';
import React from 'react';
import {
  Text,
  StatusBar,
  ScrollView,
  View,
  Image,
} from 'react-native';

import {text} from './lorem';

const HostNavigationMock = () => (
    <View style={{flex: 1}}>
      <View style={{position: 'absolute',top: 0, left: 0, height: '100%', width: '100%', backgroundColor: 'blue'}}>
        <HomeScreen />
      </View>
      <View style={{position: 'absolute',top: 0, left: 0, height: '100%', width: '100%', backgroundColor: 'blue'}}>
        <BuggyScreen />
      </View>
    </View>
)

const HomeScreen = () => {
  return (
    <>
      <StatusBar
        backgroundColor="transparent"
        barStyle="dark-content"
        translucent
      />
        <View style={{flex: 1}}>
          <View style={{overflow: 'hidden', borderRadius: 2}}>
            <Image style={{width: 300, aspectRatio: 1.7}} source={{uri: 'https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg'}} />
          </View>
      </View>
    </>
  );
};

const BuggyScreen = (_props) => {
  return (
      <View style={{
        flex: 1,
        backgroundColor: 'white',
      }}
      >
        <View
            style={{
              position: 'relative',
              shadowOpacity: 0.2,
              height: 93.55636467673563,
              width: 500,
              backgroundColor: 'white',
              zIndex: 2,
            }}
        />
        <ScrollView style={{
          flex: 1,
          backgroundColor: 'red',
        }}
        >
          <Text>{text}</Text>
        </ScrollView>
      </View>
  );
};

export default class App extends React.Component {
  render() {
    return <HostNavigationMock />;
  }
}
