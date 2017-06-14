/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Page from './page';

class PageIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      PageAllNum:9,//总页数
      activePage:8,//当前活动页码数
      current:8,//回调的当前页面数
    };
  }
  callBack(CB){
    console.log(CB)
    this.setState({
      current:CB,
      // activePage:CB,
    })
  }
  render(){
    return(
      <View style={{flex:1}}>
        <View style={styles.container}>
          <Text>{this.state.current}</Text>
        </View>
        <Page PageAllNum={9} activePage={8} callBack={(CB)=>this.callBack(CB)}/>
      </View>
      
    )
  }
}
const styles = StyleSheet.create({
  //父组件样式
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});



AppRegistry.registerComponent('Page', () => PageIndex);
