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
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TextInput,
  Button,
  ActivityIndicator
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Api from '../../lib/api';
import Helper from '../../lib/helper';
import WordDefinition from '../../components/wordDef';
import commonStyles from '../../../commonStyles';
import Header from '../../components/header';

class FavDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {errorMsg: '', loading: false, definition: null};
  }

  componentDidMount() {
    if(Helper.isNotNullAndUndefined(this.props, ['route', 'params', 'word'])) {
      this.getDefinition(this.props.route.params.word);
    }
  }

  async getDefinition(word) {
    
    try {
      this.setState({loading: true});
      
      if(word.length > 0) {
        let wordDefinition = await Api.getDefinition(word);
        if(wordDefinition.success) {
          this.setState({errorMsg: '', loading: false, definition: wordDefinition.payload});
          console.log('Word Definition: ', wordDefinition.payload);
        }
        else {
          this.setState({errorMsg: 'Unable to get result from Oxford: ' + wordDefinition.message, loading: false, definition: null});
        }
      }
      else {
        this.setState({errorMsg: 'Invalid word. Please specify a valid word.', loading: false, definition: null});
      }
    
    } catch (error) {
      console.log('Error: ', error);
      this.setState({loading: false, errorMsg: error.message, definition: null});
    }
  }

  render() {
    return (
      <>
        <SafeAreaView
          style={commonStyles.content}>
          <Header navigation={this.props.navigation} Title={'Word Detail'} />
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
          >
            <View style={[commonStyles.column, commonStyles.header]}>
              <Image style={commonStyles.logo} source={require('../../../assets/icon.png')} />
            </View>
            
            <View style={{minHeight: 10, maxHeight: 10}}></View>

            {
              this.state.errorMsg.length > 0 &&
              <Text style={commonStyles.errMsg}>{this.state.errorMsg}</Text>
            }

            {/* Display word definition as custom component */}
            <WordDefinition def={this.state.definition} hideFav={true} />
          </ScrollView>
        </SafeAreaView>
        {
          this.state.loading &&
          <ActivityIndicator style={commonStyles.loading} size="large" color={'#219bd9'} />
        }
      </>
    );
  }
}

export default function(props) {
  const navigation = useNavigation();
  const route = useRoute();

  return <FavDetail {...props} navigation={navigation} route={route} />
}
