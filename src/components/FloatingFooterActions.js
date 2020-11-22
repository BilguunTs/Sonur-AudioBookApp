import React, {Component} from 'react';
import PlayBtn from './PlayButton'
export default class FloatingFooterActions extends Component {
  constructor(props){
      super(props)
      this.size=this.props.size||40
  }
  render() {
    return (
    <PlayBtn size={this.size}/>
    );
  }
}
