/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useIsFocused } from '@react-navigation/native';
import { SwipeListView } from 'react-native-swipe-list-view';

import Helper from '../../lib/helper';
import commonStyles from '../../../commonStyles';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import FavDetail from '../favDetail';
import Header from '../../components/header';

class Fav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {favList: [], errorMsg: '', loading: true, loaded: false};
  }

  componentDidMount() {
    this.loadFavList();
  }

  loadFavList() {
    Helper.getFavList('')
    .then(result => {
      console.log('Helper.getFavList: ', result);
      this.setState({favList: result, errorMsg: '', loading: false, loaded: true});
    })
    .catch(err => {
      this.setState({favList: [], errorMsg: err, loading: false, loaded: false});
    });
  }

  componentDidUpdate(prevProps) {
    // Detect if the user switch the tab navigator to "My Fav",
    // If yes reload the data again in case user add in new word.
    if (!prevProps.isFocused && this.props.isFocused) {
      //Call action to update you view
      this.loadFavList();
    }
  }

  render() {
    return (
      <>
        <SafeAreaView
          style={commonStyles.content}>
          <Header navigation={this.props.navigation} Title={'My Favourite'} isAtRoot={true} />
          <View style={[
            commonStyles.header
          ]}>
            <Image style={commonStyles.logo} source={require('../../../assets/icon.png')} />
          </View>
          
          <SwipeListView
            data={this.state.favList}
            keyExtractor= {item => item.word}
            renderItem={ (data, rowMap) => (
              <TouchableHighlight style={styles.rowFront}
                key={'Front_' + data.item.word}
                underlayColor={'#d6f9ff'}
                onPress={() => {
                  this.props.navigation.navigate({
                    name: 'FavDetail',
                    params: {
                      word: data.item.word,
                    }
                  });
                }}
              >
                <View style={commonStyles.row}>
                  <View style={{flex: 8}}>
                    <Text style={styles.word}>{Helper.capitalize(data.item.word)}</Text>
                    <Text style={styles.addedOn}>Added On: {moment(data.item.addedOn).format('DD MMM YYYY h:mm A')}</Text>
                    <Text style={styles.sense}>{Helper.capitalize(data.item.sense)}</Text>
                  </View>
                  <View style={styles.rowRightArrow}>
                    <Icon name={'ios-arrow-forward'} size={26} color={'#dadada'} />
                  </View>
                </View>
              </TouchableHighlight>
            )}
            renderHiddenItem={ (data, rowMap) => (
              <View key={'Hidden_' + data.item.word} style={styles.rowBack}>
                <TouchableOpacity 
                  onPress={() => {
                    Helper.deleteFav(data.item.word, () => {
                      this.loadFavList();
                    });
                  }}
                  style={styles.deleteButton}
                >
                  <Icon name={'ios-trash'} size={30} color={'white'} />
                </TouchableOpacity>
              </View>
            )}
            ListEmptyComponent={() => (
              <View style={styles.rowEmpty}>
                {
                  this.state.loaded &&
                  <Text>No favourite word.</Text>
                }
              </View>
            )}
            leftOpenValue={0}
            rightOpenValue={-50}
          />
        </SafeAreaView>
      
        {
          this.state.loading &&
          <ActivityIndicator style={commonStyles.loading} size="large" color={'#219bd9'} />
        }
      </>
    );
  }
}

const styles = StyleSheet.create({
  rowEmpty: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#eaeaea',
    alignItems: 'stretch',
    justifyContent: 'center',
    marginBottom: StyleSheet.hairlineWidth,
    height: 50,
    padding: 6,
    alignItems: 'center'
  },
  rowFront: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#eaeaea',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    marginBottom: 1,
    height: 70,
    padding: 6,
    alignItems: 'center'
  },
  rowBack: {
    flex: 1,
    alignItems: 'flex-end',
    backgroundColor: '#d0d0d0',
    justifyContent: 'center',
    marginBottom: 0,
    paddingRight: 0,
    height: 70
  },
  rowRightArrow: {
    flex: 1, 
    alignItems: 'flex-end', 
    justifyContent: 'center', 
    paddingRight: 20
  },
  deleteButton: {
    flex: 1, 
    width: 50, 
    backgroundColor: 'red', 
    justifyContent: 'center', 
    alignItems: 'center', 
    margin: 1.5
  },
  word: {
    fontSize: 14,
    color: 'black',
    fontWeight: "bold"
  },
  sense: {
    fontSize: 12,
    color: 'black'
  },
  addedOn: {
    fontSize: 10,
    color: 'gray'
  }
});

const Stack = createStackNavigator();

export default function(props) {
  const isFocused = useIsFocused();
  
  return(
    <Stack.Navigator
      initialRouteName="Fav"
      headerMode="none"
    >
      <Stack.Screen name="Fav" options={{title: 'Word List'}}>
        {props => <Fav {...props} isFocused={isFocused} />}
      </Stack.Screen>
      <Stack.Screen name="FavDetail" options={{title: 'Word Definition'}}> 
        {props => <FavDetail {...props}  />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

