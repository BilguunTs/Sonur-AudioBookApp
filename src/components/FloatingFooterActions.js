import React, {Component} from 'react';
import PlayBtn from './PlayButton'
import PurchaseBtn from './PurchaseBtn'
export default class FloatingFooterActions extends Component {
  constructor(props){
      super(props)
      this.size=this.props.size||40
  }
  render() {
    const {type}=this.props
     if(type==='purchase'){
       return <PurchaseBtn/>
     }else if(type==='play'){
       return <PlayBtn size={this.size}/>
     }
    return null
  }
}
