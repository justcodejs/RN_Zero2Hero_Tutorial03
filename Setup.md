# Setup Steps From Tutorial 2 to 3

## Setup Navigation
Install the NPM module for the React Navigation 5.

```
yarn add @react-navigation/native

yarn add react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view

yarn add @react-navigation/drawer @react-navigation/bottom-tabs @react-navigation/stack
```
## Setup Additional Module
Install the other NPM module require by the App for Tutorial 3.

```
yarn add @react-native-community/async-storage
yarn add react-native-swipe-list-view

yarn add react-native-vector-icons
yarn add moment
```

## Configuration for installed NPM Modules

## For iOS:
Edit the ios/Podfile add in the following line
```
pod 'RNVectorIcons', :path => '../node_modules/react-native-vector-icons'
```

Edit the ios/JustCodeDict/Info.plist file add in the following lines.
```
<key>UIAppFonts</key>
<array>
  <string>AntDesign.ttf</string>
  <string>Entypo.ttf</string>
  <string>EvilIcons.ttf</string>
  <string>Feather.ttf</string>
  <string>FontAwesome.ttf</string>
  <string>FontAwesome5_Brands.ttf</string>
  <string>FontAwesome5_Regular.ttf</string>
  <string>FontAwesome5_Solid.ttf</string>
  <string>Foundation.ttf</string>
  <string>Ionicons.ttf</string>
  <string>MaterialIcons.ttf</string>
  <string>MaterialCommunityIcons.ttf</string>
  <string>SimpleLineIcons.ttf</string>
  <string>Octicons.ttf</string>
  <string>Zocial.ttf</string>
</array>
```
Run the following command in project root folder to perform pod install for iOS.

```
cd ios && pod install && cd ..
```

## For Android
To finalize installation of react-native-screens for Android, add the following two lines to dependencies section in android/app/build.gradle:

```
implementation 'androidx.appcompat:appcompat:1.1.0-rc01'
implementation 'androidx.swiperefreshlayout:swiperefreshlayout:1.1.0-alpha02'
```

For Vector Icon, edit android/app/build.gradle and add the following:

```
apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"
```

If enable Hermes by edit the android/app/build.gradle file to change the enableHermes to true, you need to execute the following command.

`cd android && ./gradlew clean && cd ..`

