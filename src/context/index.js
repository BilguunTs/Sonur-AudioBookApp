import React, {createContext, Component} from 'react';
import { Alert } from 'react-native';
import {GLOBAL_VALUE} from '../configs'
export const Contextulize = createContext();

export class ContextProvider extends Component{
    constructor(props) {
        super(props);
        this.state = {
        gplayer:{...GLOBAL_VALUE.gplayer}
     }
      }

    setGplayer =(obj)=>{
      let instance = Object.assign(GLOBAL_VALUE.gplayer,{...obj});
      this.setState({gplayer:{...instance,isActive:true}})
    }
    render(){ 
     return(
       <Contextulize.Provider
        value={{
            stats:this.state,
            methods:this._getMethods()
        }}>
        {this.props.children}
      </Contextulize.Provider>)
    }
    _getMethods(){
        return{
            setGplayer:(o)=>this.setGplayer(o)
        }
    }
}

export function withGlobalContext(Component) {
    return class WrapperComponent extends React.Component {
      render() {
        return (
          <Contextulize.Consumer>
            {(store) => <Component {...this.props} global={store} />}
          </Contextulize.Consumer>
        );
      }
    };
}