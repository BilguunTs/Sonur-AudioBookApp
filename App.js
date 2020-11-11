import React from 'react';
import {AppNavigator as Main} from './src/routes';
import {ContextProvider} from './src/context' 
const AppSonur=()=>  <ContextProvider><Main/></ContextProvider>

export default AppSonur