import React, {Component} from 'react';
import PlayBtn from './PlayButton'
import PurchaseBtn from './PurchaseBtn'
export default class FloatingFooterActions extends Component {
  constructor(props){
      super(props)
      this.size=this.props.size||40;
  }
  handlePress=()=>{
    const {type,item,global} =this.props;
    switch(type){
      case "purchase":
        console.log("should open invoice dialog");
        break;
      case"play":
        global.methods.setGplayer(item);
        break;
    }
   
  }
  render() {
    const {type}=this.props;
     if(type==='purchase'){
       return <PurchaseBtn onPress={this.handlePress}/>
     }else if(type==='play'){
       return <PlayBtn onPress={this.handlePress} size={this.size}/>
     }
    return null
  }
}
