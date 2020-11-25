import React from 'react';
import VerticalBooks from '../views/VerticalListBook'
import {withHeader} from '../HOC'
import {MAIN} from '../configs'

export default withHeader(MAIN.HEADER.WITH.BACK)(({navigation,route})=>{
    return <VerticalBooks params={route.params} navigation={navigation}/>
})