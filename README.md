## React native Android scrollview flickering bug ##
This project demonstrates a bug on React native android (on Xiaomi Mi9T, OnePlus 7 pro and others ...).
This bug seems to appear only when the "fullscreen mode" is enabled ( no navigation bar at the bottom, only gesture to navigate between screens and app).
I did not manage to find the root cause of it. but here what I know...

### The bug ###
When scrolling in a scrollview, the content randomly and partially disappear and reappear.
<table>
     <thead>
            <tr>
                <th colspan="2">The bug</th>
                <th colspan="2">Expected behavior</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><img width="320" src="https://raw.githubusercontent.com/ACHP/ReactNative-android-flickering-issue/master/gifs/initial%20bug.gif"/></td>
                <td><img width="320" src="https://raw.githubusercontent.com/ACHP/ReactNative-android-flickering-issue/master/gifs/expected%20behavior.gif"/></td>
            </tr>
        </tbody>
</table>


## What I know ##
It seems to be related to the presence of another screen behind the visible one, so, this happens when using react-navigation (v4 in my case), but for the example I was able to reproduce it by simply using absolute positioning.

<img width="320" src="https://raw.githubusercontent.com/ACHP/ReactNative-android-flickering-issue/master/gifs/app.png"/>

The "HomeScreen" is a simple *View* with a translucent *StatusBar* and an *Image* component.
The "Buggy" Screen is a View containing an absolutely positioned *View* (header) and a *ScrollView* (content)

The bug seems to be caused by the use of multiple style attribute, that make it "simple" to bypass because we have a lot a parameter we can tweak to avoid it, but also hard to reproduce and understand.
I have annotated all the style props that seems to have an impact on the bug to distinguish them from the props that are here for UI purposes.

In the *HomeScreen* the important props are : 
```javascript
const homeScreenStylesheet = StyleSheet.create({
  imageWrapper: {
    overflow: 'hidden', // bug
    borderRadius: 1, // bug
  },
});
```

In the *BuggyScreen* the important props are : 
```javascript
const buggedScreenStylesheet = StyleSheet.create({
  wrapper: {
    backgroundColor: 'white', // bug if same as `header` background.
  },
  header: {
    position: 'relative', // bug if present
    shadowOpacity: 0.2, // bug
    width: 500, // bug if greater than x ( x = 93 in my case ...)
    backgroundColor: 'white', // bug if same as `wrapper` background.
    zIndex: 2, // bug if present
  },
});
```

Here are a table of comparison to show how strange this bug is :

<table>
     <thead>
            <tr>
                <th colspan="2">Without the HomeScreen</th>
                <th colspan="2">With the HomeScreen</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><img width="320" src="https://raw.githubusercontent.com/ACHP/ReactNative-android-flickering-issue/master/gifs/without%20home%20screen%20behind.gif"/></td>
                <td>Same bug as mentionned before</td>
            </tr>
        </tbody>
</table>

<table>
     <thead>
            <tr>
                <th colspan="2">Header with different color from `wrapper`</th>
                <th colspan="2">with same color</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><img width="320" src="https://raw.githubusercontent.com/ACHP/ReactNative-android-flickering-issue/master/gifs/red-green-colors.gif"/></td>
                <td>Same bug as mentioned before</td>
            </tr>
        </tbody>
</table>

<table>
     <thead>
            <tr>
                <th colspan="2">Header width < 93</th>
                <th colspan="2">Header width > 93</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><img width="320" src="https://raw.githubusercontent.com/ACHP/ReactNative-android-flickering-issue/master/gifs/width%2092.gif"/></td>
                <td>
                    <img width="320" src="https://raw.githubusercontent.com/ACHP/ReactNative-android-flickering-issue/master/gifs/width%2094.gif"/>
                    <p>Note how partially the bug appears on the screen</p>
                </td>
            </tr>
        </tbody>
</table>

<table>
     <thead>
            <tr>
                <th colspan="2">without zIndex</th>
                <th colspan="2">with zIndex > 0</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><img width="320" src="https://raw.githubusercontent.com/ACHP/ReactNative-android-flickering-issue/master/gifs/without%20zIndex.gif"/></td>
                <td><img width="320" src="https://raw.githubusercontent.com/ACHP/ReactNative-android-flickering-issue/master/gifs/zIndex%20gt%200.gif"/></td>
            </tr>
        </tbody>
</table>

## Todos ##
 - [x] Buy an android phone ( xiaomi Mi9T )
 - [x] Create a demo project without react navigation
 - [ ] Tests older version of react native to ( maybe track the exact commit ... ?)
 - [ ] search in RN's native code ...

## Infos ##
```
System:
    OS: macOS 10.15.5
    CPU: (4) x64 Intel(R) Core(TM) i5-7360U CPU @ 2.30GHz
    Memory: 22.03 MB / 16.00 GB
    Shell: 5.7.1 - /bin/zsh
  Binaries:
    Node: 14.5.0 - ~/.nvm/versions/node/v14.5.0/bin/node
    Yarn: 1.21.1 - ~/.yarn/bin/yarn
    npm: 6.14.5 - ~/.nvm/versions/node/v14.5.0/bin/npm
    Watchman: 4.9.0 - /usr/local/bin/watchman
  Managers:
    CocoaPods: 1.8.4 - /Users/alexischappron/.rvm/rubies/ruby-2.6.3/bin/pod
  SDKs:
    iOS SDK:
      Platforms: iOS 13.6, DriverKit 19.0, macOS 10.15, tvOS 13.4, watchOS 6.2
    Android SDK: Not Found
  IDEs:
    Android Studio: 3.5 AI-191.8026.42.35.5791312
    Xcode: 11.6/11E708 - /usr/bin/xcodebuild
  Languages:
    Java: 10.0.2 - /usr/bin/javac
    Python: 3.8.2 - /Users/alexischappron/.pyenv/shims/python
  npmPackages:
    @react-native-community/cli: Not Found
    react: 16.13.1 => 16.13.1
    react-native: 0.63.2 => 0.63.2
  npmGlobalPackages:
    *react-native*: Not Found
```
