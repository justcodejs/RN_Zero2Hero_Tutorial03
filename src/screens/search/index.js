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
  ScrollView,
  View,
  Text,
  Image,
  TextInput,
  Button,
  ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Api from '../../lib/api';
import Helper from '../../lib/helper';
import WordDefinition from '../../components/wordDef';
import Header from '../../components/header';
import commonStyles from '../../../commonStyles';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {userWord: '', errorMsg: '', loading: false, definition: null};
  }

  onUserWordChange(text) {
    this.setState({userWord: text});
  }

  async onSearch() {
    if(this.state.userWord.length <= 0) {
      this.setState({errorMsg: 'Please specify the word to lookup.'})
      return;
    }

    try {
      this.setState({loading: true});
      let lemmas = await Api.getLemmas(this.state.userWord);
      console.log('Lemmas: ', lemmas);
      if(lemmas.success) {
        let headWord = Helper.carefullyGetValue(lemmas, ['payload', 'results', '0', 'lexicalEntries', '0', 'inflectionOf', '0', 'id'], '');
        console.log('Headword is: ', headWord);
        if(headWord.length > 0) {
          let wordDefinition = await Api.getDefinition(headWord);
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
      }
      else {
        this.setState({errorMsg: 'Unable to get result from Oxford: ' + lemmas.message, loading: false, definition: null});
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
          <Header navigation={this.props.navigation} Title={'My Dictionary'} isAtRoot={true} />
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
          >
            
            <View style={[commonStyles.column, commonStyles.header]}>
              <Image style={commonStyles.logo} source={require('../../../assets/icon.png')} />
              <Text style={commonStyles.sectionTitle}>Just Code Dictionary</Text>
            </View>
            
            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 4, paddingRight: 4 }}
              onChangeText={text => this.onUserWordChange(text)}
              placeholder={'Key in the word to search'}
              value={this.state.userWord}
            />

            <View style={{minHeight: 10, maxHeight: 10}}></View>

            <Button
              title="Search"
              onPress={() => this.onSearch()}
            />

            {
              this.state.errorMsg.length > 0 &&
              <Text style={commonStyles.errMsg}>{this.state.errorMsg}</Text>
            }

            {/* Display word definition as custom component */}
            <WordDefinition def={this.state.definition} />
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

export default (props) => {
  const navigation = useNavigation();
  return (
    <Search {...props} navigation={navigation} />
  )
}