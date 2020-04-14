/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  View,
  StatusBar,
  Image,
  Linking
} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createDrawerNavigator, 
         DrawerContentScrollView, 
         DrawerItemList, 
         DrawerItem
       } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import Search from './src/screens/search';
import Fav from './src/screens/fav';
import Profile from './src/screens/profile';
import commonStyles from './commonStyles';

const Drawer = createDrawerNavigator();
const DrawerNav = (props) => {
  return (
    <Drawer.Navigator 
      initialRouteName="TabNav"
      drawerContent={props => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="TabNav" component={TabNav} options={{title: 'Home'}} />
      <Drawer.Screen name="Profile" component={Profile} options={{title: 'My Profile'}} />
    </Drawer.Navigator>
  );
}

const DrawerContent = (props) => {
  return (
    <>
      <View style={commonStyles.drawerHeader}>
        <Image source={require('./assets/icon.png')} style={commonStyles.drawerProfilePhoto}  />
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList activeBackgroundColor={'transparent'} {...props} />
        <DrawerItem
          label="About"
          onPress={() => Linking.openURL('https://www.justnice.net')}
        />
      </DrawerContentScrollView>
    </>
  );
}

const Tab = createBottomTabNavigator();
const TabNav = () => {
  
  return(
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = 'logo-react';

          if (route.name === 'Search') {
            iconName = 'ios-search';
          } else if (route.name === 'Fav') {
            iconName = focused ? 'ios-heart' : 'ios-heart-empty';
          }
          
          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        }
      })}
      tabBarOptions={{
        activeTintColor: 'white',
        inactiveTintColor: 'gray',
        activeBackgroundColor: '#219bd9',
        inactiveBackgroundColor: '#d6f9ff',
        safeAreaInsets: {bottom: 0},
        style: {height: 70},
        tabStyle: {paddingBottom: 15}
      }}
    >
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Fav" component={Fav} />
    </Tab.Navigator>
  );
}

class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <StatusBar barStyle="default" backgroundColor="#219bd9" />
        <DrawerNav />
      </NavigationContainer>
    );
  }
}

export default App;
