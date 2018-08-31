/**
 * Created by Rabbit 下午6:40
 */

import React from 'react';


import Spinner from 'react-native-loading-spinner-overlay';

const Loading = (props) => {
    return (

            <Spinner visible={props.visible} textContent={"Loading..."} textStyle={{color: '#FFF'}}/>

    )
};
export default Loading;