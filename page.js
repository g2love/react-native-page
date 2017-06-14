/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,TouchableOpacity,Dimensions,
  View
} from 'react-native';

var {width,height}=Dimensions.get('window');

class Page extends Component {
  	constructor(props) {
		super(props);
		this.state = {
			PageAllNum:this.props.PageAllNum,
			activePage:this.props.activePage,
			prevDis:false,
			nextDis:false,
		};
  	}
  	componentWillMount() {
		this.ChangeRusult(this.props.PageAllNum,this.props.activePage);
  	}
  	ChangeRusult(PAN,AC){
		var result=[];
		if(PAN>5&&AC>2&&PAN-AC>=2){
			result=[AC-2,AC-1,AC,AC+1,AC+2];
		}else if(PAN>5&&AC<=2){
			result=[1,2,3,4,5];
		}else if(PAN>5&&PAN-AC==1){
			result=[AC-3,AC-2,AC-1,AC,AC+1];
		}else if(PAN>5&&PAN-AC<1){
			result=[AC-4,AC-3,AC-2,AC-1,AC];
		}else if(PAN<=5){
			for(var i=0; i<PAN;i++){
				result.push(i+1);
			}
		}
		this.setState({
			arr:result,
			activePage:AC,
		});
		if(AC==1){//禁用上一步
			this.setState({
				prevDis:true,
			});
		}else{
			this.setState({
				prevDis:false,
			});
		}
		if(AC==PAN){//禁用下一步
			this.setState({
				nextDis:true,
			});
		}else{
			this.setState({
				nextDis:false,
			});
		}
		this.props.callBack(AC);//向父组件回调传值
		this.callBack(AC);//当前组件回调传值
  	}
  	//页码回调事件
  	callBack(Page){
		// console.log('当前页码数是:'+Page);
		// alert('当前页码数是:'+Page);
  	}

  	clickPage(data){
		this.ChangeRusult(this.props.PageAllNum,data);
  	}
  	prevPage(){
		var _activePage=this.state.activePage;
		if(_activePage>1){
			this.ChangeRusult(this.props.PageAllNum,_activePage-1);
		}
  	}
  	nextPage(){
		var _activePage=this.state.activePage;
		if(_activePage<this.state.PageAllNum){
			this.ChangeRusult(this.props.PageAllNum,_activePage+1);
		}
  	}
  	render() {
		return (
			<View style={styles.wrap}>
			<Button PageNum={"prev"} onPress={()=>this.prevPage()} Disabled={this.state.prevDis}/>
				{this.state.arr.map((data,index)=>(
					<Button PageNum={data} key={index} active={this.state.activePage} onPress={()=>this.clickPage(data)}/>
				))   
				}
			<Button PageNum={"next"} onPress={()=>this.nextPage()} Disabled={this.state.nextDis}/>
			</View>
		);
  	}
}

class Button extends Component{
	constructor(props) {
		super(props);
		this.state = {
			active:this.props.active,
			thisPage:this.props.PageNum,
		};
	}
	render(){
		if(this.props.PageNum==this.props.active){
			return (
				<TouchableOpacity onPress={this.props.onPress} style={styles.buttonActive}>
					<Text style={styles.buttonFontActive}>{this.props.PageNum}</Text>
				</TouchableOpacity>
			)
		}else{
			return (
				<TouchableOpacity onPress={this.props.onPress} style={styles.button} disabled={this.props.Disabled}>
					<Text style={styles.buttonFont}>{this.props.PageNum}</Text>
				</TouchableOpacity>
			)
		}
		
	}
}
// /
const styles = StyleSheet.create({
	//父组件样式
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	//分页器的样式
	wrap: {
		width:width,
		height:50,
		flexDirection:'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	button:{
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor:'#F5FCFF',
		borderWidth:0.5,
		borderStyle:'solid',
		borderColor:'#16865f',
		marginLeft:2,
		marginRight:2,
	},
	buttonFont:{
		fontSize:16,
		color:'#ababab',
	},
	buttonActive:{
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor:'#16865f',
		borderWidth:0.5,
		borderStyle:'solid',
		borderColor:'#16865f',
		marginLeft:2,
		marginRight:2,
	},
	buttonFontActive:{
		fontSize:16,
		color:'#ffffff',
	},
});

export default Page