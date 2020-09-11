import React from 'react';
import {
  Text,
  StatusBar,
  ScrollView,
  View,
  Image,
  StyleSheet,
} from 'react-native';

import {text} from './lorem';

const HomeScreen = () => {
  return (
    <>
      <StatusBar
        backgroundColor="transparent"
        barStyle="dark-content"
        translucent={true}
      />
      <View style={{flex: 1}}>
        <View style={homeScreenStylesheet.imageWrapper}>
          <Image
            style={homeScreenStylesheet.image}
            source={{
              uri:
                'https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg',
            }}
          />
        </View>
      </View>
    </>
  );
};

const homeScreenStylesheet = StyleSheet.create({
  imageWrapper: {
    overflow: 'hidden', // bug
    borderRadius: 1, // bug
  },
  image: {
    width: 300,
    height: 300,
  },
});

const BuggyScreen = (_props) => {
  return (
    <View style={buggedScreenStylesheet.wrapper}>
      <View style={buggedScreenStylesheet.header} />
      <ScrollView style={buggedScreenStylesheet.content}>
        <Text>{text}</Text>
      </ScrollView>
    </View>
  );
};

const buggedScreenStylesheet = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white', // bug if same as `header` background.
  },
  header: {
    position: 'relative', // bug if present
    shadowOpacity: 0.2, // bug
    width: 500, // bug if greater than x ( x = 93 in my case ...)
    backgroundColor: 'white', // bug if same as `wrapper` background.
    zIndex: 2, // bug if present
    height: 100,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    backgroundColor: 'red',
  },
});

export default class App extends React.Component {
  render() {
    return (
      <View style={appStylesheet.app}>
        <View style={appStylesheet.screen}>
          <HomeScreen />
        </View>
        <View style={appStylesheet.screen}>
          <BuggyScreen />
        </View>
      </View>
    );
  }
}

const appStylesheet = StyleSheet.create({
  app: {
    flex: 1,
  },
  screen: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    backgroundColor: 'blue',
  },
});
